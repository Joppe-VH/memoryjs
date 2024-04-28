import MemoryJs from "../index"
import { Register } from "../unions/Register"
import { TriggerType } from "../unions/TriggerType"
import { DataType } from "../unions/DataType"
import { EventEmitter } from "events"

export declare class Debugger extends EventEmitter {
    constructor(memoryjs: typeof MemoryJs)

    attach(processId: number, killOnDetatch?: boolean /*default = false*/): boolean;
    detatch(processId: number): boolean;
    removeHardwareBreakpoint(processId: number, register: Register): boolean;
    setHardwareBreakpoint(
        processId: number,
        address: number,
        trigger: TriggerType,
        dataType: DataType
    ): Register
    monitor(register: Register, timeout?: number /*default = 100*/): void;
}