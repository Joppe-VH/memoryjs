import { DataType, DataTypeNumber, DataTypeBigInt, DataTypeBoolean, DataTypeString, DataTypeVector3, DataTypeVector4, DataTypePointer } from "./unions/DataType";
import { FunctionDataType } from "./unions/FunctionDataType";
import { MemoryAllocationType } from "./unions/MemoryAllocationType";
import { MemoryPageType } from "./unions/MemoryPageType";
import { MemoryState } from "./unions/MemoryState";
import { ProtectionType } from "./unions/ProtectionType";
import { Register } from "./unions/Register";
import { ReturnTypeVoid, ReturnTypeBoolean, ReturnTypeNumber, ReturnTypeString } from "./unions/ReturnType";
import { SignatureType } from "./unions/SignatureType";
import { TriggerType } from "./unions/TriggerType";

import { Callback } from "./models/Callback";
import { DebugEvent } from "./models/DebugEvent";
import { FunctionArg } from "./models/FunctionArg";
import { MemoryBasicInformation } from "./models/MemoryBasicInformation";
import { Module } from "./models/Module";
import { Process } from "./models/Process";
import { ReturnObject } from "./models/ReturnObject";
import { Vector3, Vector4 } from "./models/Vector";

import { Debugger } from "./classes/Debugger";

declare namespace MemoryJs {

    function openProcess(processIdentifier: number | string): Process;
    function openProcess(processIdentifier: number | string, callback: Callback<Process>): void;

    function closeProcess(handle: number): void;

    function getProcesses(): Process[];
    function getProcesses(callback: Callback<Process[]>): void;

    function findModule(moduleName: string, processId: number): Module;
    function findModule(moduleName: string, processId: number, callback: Callback<Module>): void;

    function getModules(processId: number): Module[];
    function getModules(processId: number, callback: Callback<Module[]>): void;

    function readMemory(handle: number, address: number, dataType: DataTypeBoolean): boolean;
    function readMemory(handle: number, address: number, dataType: DataTypeString): string;
    function readMemory(handle: number, address: number, dataType: DataTypeNumber): number;
    function readMemory(handle: number, address: number, dataType: DataTypeBigInt): bigint;
    function readMemory(handle: number, address: number, dataType: DataTypePointer): number | bigint;
    function readMemory(handle: number, address: number, dataType: DataTypeVector3): Vector3;
    function readMemory(handle: number, address: number, dataType: DataTypeVector4): Vector4;

    function readMemory(handle: number, address: number, dataType: DataTypeBoolean, callback: Callback<boolean>): void;
    function readMemory(handle: number, address: number, dataType: DataTypeString, callback: Callback<string>): void;
    function readMemory(handle: number, address: number, dataType: DataTypeNumber, callback: Callback<number>): void;
    function readMemory(handle: number, address: number, dataType: DataTypeBigInt, callback: Callback<bigint>): void;
    function readMemory(handle: number, address: number, dataType: DataTypePointer, callback: Callback<number | bigint>): void;
    function readMemory(handle: number, address: number, dataType: DataTypeVector3, callback: Callback<Vector3>): void;
    function readMemory(handle: number, address: number, dataType: DataTypeVector4, callback: Callback<Vector4>): void;

    function readBuffer(handle: number, address: number, size: number): Buffer;
    function readBuffer(handle: number, address: number, size: number, callback: Callback<Buffer>): void;

    function writeMemory(handle: number, address: number, value: boolean, dataType: DataTypeBoolean): void;
    function writeMemory(handle: number, address: number, value: string, dataType: DataTypeString): void;
    function writeMemory(handle: number, address: number, value: number, dataType: DataTypeNumber): void;
    function writeMemory(handle: number, address: number, value: bigint, dataType: DataTypeBigInt): void;
    function writeMemory(handle: number, address: number, value: number | bigint, dataType: DataTypePointer): void;
    function writeMemory(handle: number, address: number, value: Vector3, dataType: DataTypeVector3): void;
    function writeMemory(handle: number, address: number, value: Vector4, dataType: DataTypeVector4): void;

    function writeBuffer(handle: number, address: number, buffer: Buffer): void;

    function findPattern(
        handle: number,
        pattern: string,
        flags: SignatureType
    ): number;
    function findPattern(
        handle: number,
        pattern: string,
        flags: SignatureType,
        patternOffset: number
    ): number;
    
    function findPattern(
        handle: number,
        moduleName: string,
        pattern: string,
        flags: SignatureType
    ): number;
    function findPattern(
        handle: number,
        moduleName: string,
        pattern: string,
        flags: SignatureType,
        patternOffset: number
    ): number;

    function findPattern(
        handle: number,
        baseAddress: number,
        pattern: string,
        flags: SignatureType
    ): number;
    function findPattern(
        handle: number,
        baseAddress: number,
        pattern: string,
        flags: SignatureType,
        patternOffset: number
    ): number;

    function findPattern(
        handle: number,
        pattern: string,
        flags: SignatureType,
        callback: Callback<number>
    ): void;
    function findPattern(
        handle: number,
        pattern: string,
        flags: SignatureType,
        patternOffset: number,
        callback: Callback<number>
    ): void;
    
    function findPattern(
        handle: number,
        moduleName: string,
        pattern: string,
        flags: SignatureType,
        callback: Callback<number>
    ): void;
    function findPattern(
        handle: number,
        moduleName: string,
        pattern: string,
        flags: SignatureType,
        patternOffset: number,
        callback: Callback<number>
    ): void;

    function findPattern(
        handle: number,
        baseAddress: number,
        pattern: string,
        flags: SignatureType,
        callback: Callback<number>
    ): void;
    function findPattern(
        handle: number,
        baseAddress: number,
        pattern: string,
        flags: SignatureType,
        patternOffset: number,
        callback: Callback<number>
    ): void;

    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeVoid,
        address: number | bigint
    ): ReturnObject<void>;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeBoolean,
        address: number | bigint
    ): ReturnObject<boolean>;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeNumber,
        address: number | bigint
    ): ReturnObject<number>;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeString,
        address: number | bigint
    ): ReturnObject<string>;

    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeVoid,
        address: number | bigint,
        callback: Callback<ReturnObject<void>>
    ): void;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeBoolean,
        address: number | bigint,
        callback: Callback<ReturnObject<boolean>>
    ): void;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeNumber,
        address: number | bigint,
        callback: Callback<ReturnObject<number>>
    ): void;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeString,
        address: number | bigint,
        callback: Callback<ReturnObject<string>>
    ): void;

    function virtualAllocEx(
        handle: number,
        address: number | null,
        size: number,
        allocationType: MemoryAllocationType,
        protection: ProtectionType
    ): number | bigint;
    function virtualAllocEx(
        handle: number,
        address: number | null,
        size: number,
        allocationType: MemoryAllocationType,
        protection: ProtectionType,
        callback: Callback<number | bigint>
    ): void;
    
    function virtualProtectEx(
        handle: number,
        address: number,
        size: number,
        protection: ProtectionType
    ): ProtectionType;
    function virtualProtectEx(
        handle: number,
        address: number,
        size: number,
        protection: ProtectionType,
        callback: Callback<ProtectionType>
    ): void;

    function getRegions(handle: number): (MemoryBasicInformation & { szExeFile?: string})[];
    function getRegions(handle: number, callback: Callback<(MemoryBasicInformation & { szExeFile?: string})[]>): void;

    function virtualQueryEx(handle: number, address: number): MemoryBasicInformation;
    function virtualQueryEx(handle: number, address: number, callback: Callback<MemoryBasicInformation>): void;

    function injectDll(handle: number, dllPath: `${string}.dll`): boolean;
    function injectDll(handle: number, dllPath: `${string}.dll`, callback: Callback<boolean>): void;

    function unloadDll(handle: number, module: number | string): boolean;
    function unloadDll(handle: number, module: number | string, callback: Callback<boolean>): void;

    function openFileMapping(fileName: string): number;

    function mapViewOfFile(
        processHandle: number,
        fileHandle: number
    ): number;
    function mapViewOfFile(
        processHandle: number,
        fileHandle: number,
        offset: number,
        viewSize: number,
        pageProtection: ProtectionType
    ): number;
    function mapViewOfFile(
        processHandle: number,
        fileHandle: number,
        offset: bigint,
        viewSize: bigint,
        pageProtection: ProtectionType
    ): bigint;

    function attachDebugger(processId: number, killOnExit: boolean): boolean;

    function detachDebugger(processId: number): boolean;

    function awaitDebugEvent(hardwareRegister: Register, millisTimeout: number): DebugEvent;

    function handleDebugEvent(processId: number, threadId: number): boolean;

    function setHardwareBreakpoint(
        processId: number,
        address: number,
        hardwareRegister: Register,
        trigger: TriggerType,
        length: number
    ): boolean;

    function removeHardwareBreakpoint(processId: number, hardwareRegister: Register): boolean;

    const Debugger: Debugger;

    // constants
    const BYTE: 'byte';
    const UBYTE: 'ubyte';
    const CHAR: 'char';
    const UCHAR: 'uchar';
    const INT8: 'int8';
    const UINT8: 'uint8';
    const INT16: 'int16';
    const INT16_BE: 'int16_be';
    const UINT16: 'uint16';
    const UINT16_BE: 'uint16_be';
    const SHORT: 'short';
    const SHORT_BE: 'short_be';
    const USHORT: 'ushort';
    const USHORT_BE: 'ushort_be';
    const LONG: 'long';
    const LONG_BE: 'long_be';
    const ULONG: 'ulong';
    const ULONG_BE: 'ulong_be';
    const INT: 'int';
    const INT_BE: 'int_be';
    const UINT: 'uint';
    const UINT_BE: 'uint_be';
    const INT32: 'int32';
    const INT32_BE: 'int32_be';
    const UINT32: 'uint32';
    const UINT32_BE: 'uint32_be';
    const INT64: 'int64';
    const INT64_BE: 'int64_be';
    const UINT64: 'uint64';
    const UINT64_BE: 'uint64_be';
    const WORD: 'word';
    const DWORD: 'dword';
    const FLOAT: 'float';
    const FLOAT_BE: 'float_be';
    const DOUBLE: 'double';
    const DOUBLE_BE: 'double_be';
    const BOOL: 'bool';
    const BOOLEAN: 'boolean';
    const PTR: 'ptr';
    const POINTER: 'pointer';
    const UPTR: 'uptr';
    const UPOINTER: 'upointer';
    const STR: 'str';
    const STRING: 'string';
    const VEC3: 'vec3';
    const VECTOR3: 'vector3';
    const VEC4: 'vec4';
    const VECTOR4: 'vector4';
    const T_VOID: 0x0;
    const T_STRING: 0x1;
    const T_CHAR: 0x2;
    const T_BOOL: 0x3;
    const T_INT: 0x4;
    const T_DOUBLE: 0x5;
    const T_FLOAT: 0x6;
    const T_POINTER: 0x7;
    const NORMAL: 0x0;
    const READ: 0x1;
    const SUBTRACT: 0x2;
    const PAGE_NOACCESS: 0x01;
    const PAGE_READONLY: 0x02;
    const PAGE_READWRITE: 0x04;
    const PAGE_WRITECOPY: 0x08;
    const PAGE_EXECUTE: 0x10;
    const PAGE_EXECUTE_READ: 0x20;
    const PAGE_EXECUTE_READWRITE: 0x40;
    const PAGE_EXECUTE_WRITECOPY: 0x80;
    const PAGE_GUARD: 0x100;
    const PAGE_NOCACHE: 0x200;
    const PAGE_WRITECOMBINE: 0x400;
    const PAGE_ENCLAVE_UNVALIDATED: 0x20000000;
    const PAGE_TARGETS_NO_UPDATE: 0x40000000;
    const PAGE_TARGETS_INVALID: 0x40000000;
    const PAGE_ENCLAVE_THREAD_CONTROL: 0x80000000;
    const MEM_COMMIT: 0x00001000;
    const MEM_RESERVE: 0x00002000;
    const MEM_RESET: 0x00080000;
    const MEM_TOP_DOWN: 0x00100000;
    const MEM_RESET_UNDO: 0x1000000;
    const MEM_LARGE_PAGES: 0x20000000;
    const MEM_PHYSICAL: 0x00400000;
    const MEM_PRIVATE: 0x20000;
    const MEM_MAPPED: 0x40000;
    const MEM_IMAGE: 0x1000000;
    const DR0: 0x0;
    const DR1: 0x1;
    const DR2: 0x2;
    const DR3: 0x3;
    const TRIGGER_EXECUTE: 0x0;
    const TRIGGER_ACCESS: 0x3;
    const TRIGGER_WRITE: 0x1;
}

export { 
    MemoryJs as default,

    // Union Types
    DataType,
    DataTypeNumber,
    DataTypeBigInt,
    DataTypeBoolean,
    DataTypeString,
    DataTypeVector3,
    DataTypeVector4,
    DataTypePointer,
    FunctionDataType,
    MemoryAllocationType,
    MemoryPageType,
    MemoryState,
    ProtectionType,
    Register,
    ReturnTypeVoid,
    ReturnTypeBoolean,
    ReturnTypeNumber,
    ReturnTypeString,
    SignatureType,
    TriggerType,

    // Models
    Callback,
    DebugEvent,
    FunctionArg,
    MemoryBasicInformation,
    Module,
    Process,
    ReturnObject,
    Vector3,
    Vector4,

    // Classes
    Debugger
};