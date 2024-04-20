#pragma once
#ifndef FUNCTIONS_H
#define FUNCTIONS_H
#define WIN32_LEAN_AND_MEAN

#include <windows.h>
#include <TlHelp32.h>
#include <vector>

struct Call {
  uint64_t returnValue;
  std::string returnString;
  DWORD exitCode;
};

namespace functions {
  enum class Type {
    T_VOID = 0x0,
    T_STRING = 0x1,
    T_CHAR = 0x2,
    T_BOOL = 0x3,
    T_INT = 0x4,
    T_DOUBLE = 0x5,
    T_FLOAT = 0x6,
    T_POINTER = 0x7,
  };

  struct Arg {
    Type type;
    LPVOID value;
  };

  LPVOID reserveString(HANDLE hProcess, const char* value, SIZE_T size);
  char readChar(HANDLE hProcess, DWORD64 address);

  template <class returnDataType>
  Call call(HANDLE pHandle, std::vector<Arg> args, Type returnType, DWORD64 address, char** errorMessage) {
    std::vector<unsigned char> argShellcode;

    // x84_64 requires first 4 arguments to be past in registers rcx, rdx, r8, and r9 in that order.
    // Single and double precision floats go into xmm0, xmm1, xmm2, and xmm3 instead.
    // Additional arguments go on the stack (not implemented)
    // All values converted to 64 bit immediates to simplify the opcode generation.
    unsigned char intOps[4][2] = {
      { 0x48, 0xb9 }, // MOV into rcx
      { 0x48, 0xba }, // MOV into rdx
      { 0x49, 0xb8 }, // MOV into r8
      { 0x49, 0xb9 }, // MOV into r9
    };
    unsigned char floatOps[4][5] = {
      { 0x66, 0x48, 0x0f, 0x6e, 0xc1 }, // MOVQ rcx into xmm0
      { 0x66, 0x48, 0x0f, 0x6e, 0xca }, // MOVQ rdx into xmm1
      { 0x66, 0x49, 0x0f, 0x6e, 0xd0 }, // MOVQ r8  into xmm2
      { 0x66, 0x49, 0x0f, 0x6e, 0xd9 }, // MOVQ r9  into xmm3
    };

    int i = -1;
    for (auto &arg : args) {
      i++;
      unsigned char imm64[8] = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
      bool useFloatOps = false;

      switch (arg.type) {
        case Type::T_BOOL: {
          bool value = *static_cast<bool*>(arg.value);
          memcpy(imm64, &value, sizeof(value));
        } break;
        case Type::T_INT: {
          int value = *static_cast<int*>(arg.value);
          memcpy(imm64, &value, sizeof(value));
        } break;
        case Type::T_FLOAT: {
          float value = *static_cast<float*>(arg.value);
          memcpy(imm64, &value, sizeof(value));
          useFloatOps = true;
        } break;
        case Type::T_STRING: {
          std::string value = *static_cast<std::string*>(arg.value);
          LPVOID pointerToString = functions::reserveString(pHandle, value.c_str(), value.length());
          memcpy(imm64, &pointerToString, sizeof(pointerToString));
        } break;
        case Type::T_POINTER: {
          void * value = *static_cast<void**>(arg.value);
          memcpy(imm64, &value, sizeof(value));
        } break;
      }

      // Add opcode for moving a 64 bit immediate into the registers.
      argShellcode.insert(argShellcode.end(), std::begin(intOps[i]), std::end(intOps[i]));

      // Add the immediate
      argShellcode.insert(argShellcode.end(), std::begin(imm64), std::end(imm64));

      // If single or double precision float, use the xmm registers instead.
      if (useFloatOps)
        argShellcode.insert(argShellcode.end(), std::begin(floatOps[i]), std::end(floatOps[i]));
    }

    
    // shadow space set to fixed 32 bytes as required by the "C" calling convention spec.
    // 5th argument and beyond not implemented yet so don't need to decrement rsp further for now.
    std::vector<unsigned char> callShellcode = {
      0x48, 0xb8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // MOV rax, 0x0000000000000000 (function adress to be replaced later)
      0x48, 0x83, 0xec, 0x48, // SUB rsp, 32 (create shadow space)
      0xff, 0xd0, // CALL rax
      0x48, 0x83, 0xc4, 0x48, // ADD rsp, 32 (undo shadow space)
    };

    // Replace placeholder with actual function adress.
    memcpy(&callShellcode.data()[2], &address, sizeof(address));

    LPVOID returnValuePointer = 0;
    if (returnType != Type::T_VOID) {
      // We will reserve memory for where we want to store the result,
      // and move the return value to this address.
      returnValuePointer = VirtualAllocEx(pHandle, NULL, sizeof(returnDataType), MEM_RESERVE | MEM_COMMIT, PAGE_EXECUTE_READWRITE);

      // Intentional fallthrough to default.
      switch (returnType) {
        case Type::T_FLOAT:
        case Type::T_DOUBLE:
          // MOVQ rax, xmm0 (single and double floating point values get returned through xmm0)
          callShellcode.insert(callShellcode.end(), { 0x66, 0x48, 0x0f, 0x7e, 0xc0 });
        default:
          // MOV rax, moffs64
          callShellcode.insert(callShellcode.end(), { 0x48, 0xa3, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 });
          // Replace placeholder with actual moffs64 value.
          memcpy(&callShellcode.data()[callShellcode.size() - 8], &returnValuePointer, sizeof(returnValuePointer));
      }
    }

    // C3: return
    callShellcode.push_back(0xC3);

    // concatenate the arg shellcode with the calling shellcode
    std::vector<unsigned char> shellcode;
    shellcode.reserve(argShellcode.size() + callShellcode.size());
    shellcode.insert(shellcode.end(), argShellcode.begin(), argShellcode.end());
    shellcode.insert(shellcode.end(), callShellcode.begin(), callShellcode.end());

    // Allocate space for the shellcode
    SIZE_T size = shellcode.size() * sizeof(unsigned char);
    LPVOID pShellcode = VirtualAllocEx(pHandle, NULL, size, MEM_RESERVE | MEM_COMMIT, PAGE_EXECUTE_READWRITE);

    // Write the shellcode
    WriteProcessMemory(pHandle, pShellcode, shellcode.data(), size, NULL);

    // Execute the shellcode
    HANDLE thread = CreateRemoteThread(pHandle, NULL, NULL, (LPTHREAD_START_ROUTINE)pShellcode, NULL, NULL, NULL);

    Call data = { 0, "", (DWORD) -1 };

    if (thread == NULL) {
      *errorMessage = "unable to create remote thread.";
      return data;
    }

    WaitForSingleObject(thread, INFINITE);
    GetExitCodeThread(thread, &data.exitCode);

    // assign return value to data.
    switch (returnType) {
      case Type::T_VOID: break;
      default: 
        ReadProcessMemory(pHandle, returnValuePointer, &data.returnValue, sizeof(data.returnValue), NULL);
        VirtualFreeEx(pHandle, returnValuePointer, 0, MEM_RELEASE);
        break;
      case Type::T_STRING: {
        // strings are returned as a pointer to the actual string location.
        // get pointer, and then use it to read the string value.
        LPVOID stringPointer;
        ReadProcessMemory(pHandle, returnValuePointer, &stringPointer, sizeof(stringPointer), NULL);
        VirtualFreeEx(pHandle, returnValuePointer, 0, MEM_RELEASE);

        std::vector<char> chars;
        for (int offset = 0x00; /*until break*/; offset += sizeof(char)) {
          char c = functions::readChar(pHandle, (DWORD64)stringPointer + offset);
          chars.push_back(c);

          // break at terminator (end of string)
          if (c == '\0') break;

          // break at 1 million chars
          if (offset == (sizeof(char) * 1000000)) {
            chars.clear();
            break;
          }
        }

        std::string str(chars.begin(), chars.end());
        // TODO: pass str as LPVOID and cast back to string
        data.returnString = str;
      } break;
    }

    VirtualFreeEx(pHandle, pShellcode, 0, MEM_RELEASE);

    return data;
  }
}

#endif
#pragma once
