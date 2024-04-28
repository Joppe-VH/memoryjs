import { Register } from "../unions/Register";

export declare interface DebugEvent {
    processId: number
    threadId: number
    // Exception Code Documentation PDF:
    // https://winprotocoldoc.blob.core.windows.net/productionwindowsarchives/MS-ERREF/%5bMS-ERREF%5d.pdf
    exceptionCode: number
    exceptionFlags: number
    exceptionAddress: number
    hardwareRegister: Register,
}