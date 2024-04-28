import type { FunctionDataType } from "../unions/FunctionDataType";

declare type ArgumentType<T extends FunctionDataType> = T;

declare interface FunctionArgBoolean {
    type: ArgumentType<0x3 /*T_BOOL*/>
    value: boolean
}
declare interface FunctionArgNumber {
    type: ArgumentType< 
        | 0x4 /*T_INT*/
        | 0x5 /*T_DOUBLE*/
        | 0x6 /*T_FLOAT*/ >,
    value: number
}
declare interface FunctionArgString {
    type: ArgumentType< 0x1 /*T_STRING*/>
    value: string
}
declare interface FunctionArgPointer {
    type: ArgumentType< 0x7 /*T_POINTER*/>
    value: number | bigint
}

export declare type FunctionArg = 
    | FunctionArgBoolean
    | FunctionArgNumber
    | FunctionArgString
    | FunctionArgPointer