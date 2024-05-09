const { EventEmitter } = require('events');
const memoryjs = require('../build/Release/memoryjs');

class Process extends EventEmitter {
    constructor({
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

        this._isKnownClosedHandle = false;
        memoryjs.registerProcessExitCallback(this.handle, () => {
            this.emit('exit');
        });
    }

    closeHandle() {
        const success = memoryjs.closeHandle(this.handle);
        if (success) this._isKnownClosedHandle = true;
        return success;
    }

    hasKnownClosedHandle() {
        return this._isKnownClosedHandle;
    }
}

module.exports = Process;