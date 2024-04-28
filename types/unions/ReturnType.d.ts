import { FunctionDataType } from "./FunctionDataType";

declare type GenericReturnType<T extends FunctionDataType> = T
export declare type ReturnTypeVoid = GenericReturnType<0x0 /*T_VOID*/>;
export declare type ReturnTypeString = GenericReturnType<
    | 0x1 /*T_STRING*/
    | 0x2 /*T_CHAR*/>;
export declare type ReturnTypeBoolean = GenericReturnType< 0x3 /*T_BOOL*/>;
export declare type ReturnTypeNumber = GenericReturnType<
    | 0x4 /*T_INT*/
    | 0x5 /*T_DOUBLE*/
    | 0x6 /*T_FLOAT*/>;