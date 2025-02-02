const { EventEmitter } = require('events');

class Process extends EventEmitter {
    constructor(memoryjs, {
        dwSize,
        th32ProcessID,
        cntThreads,
        th32ParentProcessID,
        pcPriClassBase,
        szExeFile,
        modBaseAddr,
        handle,
    }) {
        super();

        this.dwSize = dwSize;
        this.th32ProcessID = th32ProcessID;
        this.cntThreads = cntThreads;
        this.th32ParentProcessID = th32ParentProcessID;
        this.pcPriClassBase = pcPriClassBase;
        this.szExeFile = szExeFile;
        this.modBaseAddr = modBaseAddr;
        this.handle = handle;

        this._memoryjs = memoryjs;
        this._isKnownClosedHandle = false;
        this._symbolsInitialized = false;
        this._memoryjs.registerProcessExitCallback(this.handle, () => {
            this.emit('exit');
        });
    }

    closeHandle() {
        const success = this._memoryjs.closeHandle(this.handle);
        if (success) this._isKnownClosedHandle = true;
        return success;
    }

    hasKnownClosedHandle() {
        return this._isKnownClosedHandle;
    }

    symbolsInitialized() {
        return this._symbolsInitialized;
    }

    initializeSymbols() {
        this._memoryjs.initializeSymbols(this.handle);
        this._symbolsInitialized = true;
    }

    cleanupSymbols() {
        this._memoryjs.cleanupSymbols(this.handle);
        this._symbolsInitialized = false;
    }

    getSymbolAddress(symbolName, callback) {
        const useCallback = arguments.length === 2;
        if (!this.symbolsInitialized()) {
            const errorMsg = 'You need to use "Process.initializeSymbols()" before you can use "Process.getSymbolAddress()".\nThis is only needed once at process startup. Do not forget to use "Process.cleanupSymbols()" on process exit.'
            if (useCallback) {
                callback({ error: errorMsg, result: 0 });
                return null;
            }
            throw new Error(errorMsg);
        }

        if (useCallback)
            return this._memoryjs.getSymbolAddress(this.handle, symbolName, callback);
        return this._memoryjs.getSymbolAddress(this.handle, symbolName);
    }
}

module.exports = Process;