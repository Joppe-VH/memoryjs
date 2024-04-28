

export declare type DataType = 
    | 'byte'
    | 'ubyte'
    | 'char'
    | 'uchar'
    | 'int8'
    | 'uint8'
    | 'int16'
    | 'int16_be'
    | 'uint16'
    | 'uint16_be'
    | 'short'
    | 'short_be'
    | 'ushort'
    | 'ushort_be'
    | 'long'
    | 'long_be'
    | 'ulong'
    | 'ulong_be'
    | 'int'
    | 'int_be'
    | 'uint'
    | 'uint_be'
    | 'int32'
    | 'int32_be'
    | 'uint32'
    | 'uint32_be'
    | 'int64'
    | 'int64_be'
    | 'uint64'
    | 'uint64_be'
    | 'word'
    | 'dword'
    | 'float'
    | 'float_be'
    | 'double'
    | 'double_be'
    | 'bool'
    | 'boolean'
    | 'ptr'
    | 'pointer'
    | 'uptr'
    | 'upointer'
    | 'str'
    | 'string'
    | 'vec3'
    | 'vector3'
    | 'vec4'
    | 'vector4';


declare type GenericDataType<T extends DataType> = T

export declare type DataTypeNumber = GenericDataType<
    | 'byte'     | 'ubyte'
    | 'int8'     | 'uint8'
    | 'int16'    | 'uint16'
    | 'int16_be' | 'uint16_be'
    | 'int'      | 'uint'
    | 'int_be'   | 'uint_be'
    | 'int32'    | 'uint32'
    | 'int32_be' | 'uint32_be'
    | 'float'    | 'float_be'
    | 'double'   | 'double_be'
>;
export declare type DataTypeBigInt = GenericDataType<
    | 'int64'    | 'uint64'
    | 'int64_be' | 'uint64_be'>;
export declare type DataTypeBoolean = GenericDataType< 'bool' | 'boolean'>;
export declare type DataTypeString  = GenericDataType< 'str'  | 'string'>;
export declare type DataTypeVector3 = GenericDataType< 'vec3' | 'vector3'>;
export declare type DataTypeVector4 = GenericDataType< 'vec4' | 'vector4'>;
export declare type DataTypePointer = GenericDataType<
    | 'ptr'      | 'pointer' 
    | 'uptr'     | 'upointer'>;
