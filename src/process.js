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
        this.memoryjs = memoryjs;

        this.dwSize = dwSize;
        this.th32ProcessID = th32ProcessID;
        this.cntThreads = cntThreads;
        this.th32ParentProcessID = th32ParentProcessID;
        this.pcPriClassBase = pcPriClassBase;
        this.szExeFile = szExeFile;
        this.modBaseAddr = modBaseAddr;
        this.handle = handle;

        const waitHandle = this._registerExitEmit()
        this.once('exit_internal', () => {
            this._unregisterExitEmit(waitHandle);
            this.memoryjs.closeHandle(this.handle);
            this.emit('exit');
        });
    }

    _registerExitEmit() {
        const waitHandle = this.memoryjs.registerProcessExitCallback(this.handle, () => {
            this.emit('exit_internal');
        })
        return waitHandle;
    }

    _unregisterExitEmit(waitHandle) {
        this.memoryjs.unregisterWaitEx(waitHandle);
    }
}

module.exports = Process;