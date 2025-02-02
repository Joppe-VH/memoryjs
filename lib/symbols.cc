#include <windows.h>
#include <dbgHelp.h>
#include <tchar.h>
#include "symbols.h"

symbols::symbols() {};
symbols::~symbols() {};

BOOL symbols::initialize(HANDLE hProcess) {
    SymSetOptions(SYMOPT_UNDNAME | SYMOPT_DEFERRED_LOADS);

    return SymInitialize(hProcess, NULL, TRUE);
}

BOOL symbols::cleanup(HANDLE hProcess) {
    return SymCleanup(hProcess);
}

UINT_PTR symbols::getAddress(HANDLE hProcess, const char* symbolName) {
    TCHAR szSymbolName[MAX_SYM_NAME];
    ULONG64 buffer[(sizeof(SYMBOL_INFO) +
        MAX_SYM_NAME * sizeof(TCHAR) +
        sizeof(ULONG64) - 1) /
        sizeof(ULONG64)];
    PSYMBOL_INFO pSymbol = (PSYMBOL_INFO)buffer;

    _tcscpy_s(szSymbolName, MAX_SYM_NAME, symbolName);
    pSymbol->SizeOfStruct = sizeof(SYMBOL_INFO);
    pSymbol->MaxNameLen = MAX_SYM_NAME;

    if(!SymFromName(hProcess, szSymbolName, pSymbol))
        return 0;
    
    return pSymbol->Address;
}