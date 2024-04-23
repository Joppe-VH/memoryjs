import type { FunctionDataType as FDT } from "../enums/FunctionDataType";

declare interface FunctionArgBoolean {
    type: FDT.T_BOOL
    value: boolean
}
declare interface FunctionArgNumber {
    type: FDT.T_INT | FDT.T_FLOAT | FDT.T_DOUBLE
    value: number
}
declare interface FunctionArgString {
    type: FDT.T_STRING
    value: string
}
declare interface FunctionArgPointer {
    type: FDT.T_POINTER
    value: number | bigint
}

export declare type FunctionArg = FunctionArgBoolean
    | FunctionArgNumber
    | FunctionArgString
    | FunctionArgPointer