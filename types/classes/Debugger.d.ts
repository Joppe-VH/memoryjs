import MemoryJs from "../index"
import { Register } from "../enums/Register"
import { TriggerType } from "../enums/TriggerType"
import { DataType } from "../enums/DataType"

export declare class Debugger extends EventEmitter {
    constructor(memoryjs: typeof MemoryJs)

    attach(processId: number, killOnDetatch: boolean = false): boolean;
    detatch(processId: number): boolean;
    removeHardwareBreakpoint(processId: number, register: Register): boolean;
    setHardwareBreakpoint(
        processId: number,
        address: number,
        trigger: TriggerType,
        dataType: DataType
    ): Register
    monitor(register: Register, timeout: number = 100): void;
}