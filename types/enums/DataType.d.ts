

export declare enum DataType {
    BYTE = 'byte',
    UBYTE = 'ubyte',
    CHAR = 'char',
    UCHAR = 'uchar',
    INT8 = 'int8',
    UINT8 = 'uint8',
    INT16 = 'int16',
    INT16_BE = 'int16_be',
    UINT16 = 'uint16',
    UINT16_BE = 'uint16_be',
    SHORT = 'short',
    SHORT_BE = 'short_be',
    USHORT = 'ushort',
    USHORT_BE = 'ushort_be',
    LONG = 'long',
    LONG_BE = 'long_be',
    ULONG = 'ulong',
    ULONG_BE = 'ulong_be',
    INT = 'int',
    INT_BE = 'int_be',
    UINT = 'uint',
    UINT_BE = 'uint_be',
    INT32 = 'int32',
    INT32_BE = 'int32_be',
    UINT32 = 'uint32',
    UINT32_BE = 'uint32_be',
    INT64 = 'int64',
    INT64_BE = 'int64_be',
    UINT64 = 'uint64',
    UINT64_BE = 'uint64_be',
    WORD = 'word',
    DWORD = 'dword',
    FLOAT = 'float',
    FLOAT_BE = 'float_be',
    DOUBLE = 'double',
    DOUBLE_BE = 'double_be',
    BOOL = 'bool',
    BOOLEAN = 'boolean',
    PTR = 'ptr',
    POINTER = 'pointer',
    UPTR = 'uptr',
    UPOINTER = 'upointer',
    STR = 'str',
    STRING = 'string',
    VEC3 = 'vec3',
    VECTOR3 = 'vector3',
    VEC4 = 'vec4',
    VECTOR4 = 'vector4'
}

export declare type DataTypeNumber = DataType.BYTE | DataType.UBYTE
    | DataType.INT8 | DataType.UINT8
    | DataType.INT16 | DataType.UINT16
    | DataType.INT16_BE | DataType.UINT16_BE
    | DataType.INT | DataType.UINT
    | DataType.INT_BE | DataType.UINT_BE
    | DataType.INT32 | DataType.UINT32
    | DataType.INT32_BE | DataType.UINT32_BE
    | DataType.FLOAT | DataType.FLOAT_BE
    | DataType.DOUBLE | DataType.DOUBLE_BE;
export declare type DataTypeBigInt = DataType.INT64 | DataType.UINT64 | DataType.INT64_BE | DataType.UINT64_BE;
export declare type DataTypeBoolean = DataType.BOOL | DataType.BOOLEAN;
export declare type DataTypeString = DataType.STR | DataType.STRING;
export declare type DataTypeVector3 = DataType.VEC3 | DataType.VECTOR3;
export declare type DataTypeVector4 = DataType.VEC4 | DataType.VECTOR4;
export declare type DataTypePointer = DataType.POINTER | DataType.PTR | DataType.UPOINTER | DataType.UPTR;
