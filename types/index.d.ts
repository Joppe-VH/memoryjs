import type { DataType, DataTypeBigInt, DataTypeBoolean, DataTypeNumber, DataTypePointer, DataTypeString, DataTypeVector3, DataTypeVector4 } from "./enums/DataType";
import type { Callback } from "./models/Callback";
import type { Process } from "./models/Process";
import type { Vector3, Vector4 } from "./models/Vector";
import type { SignatureType } from "./enums/SignatureType";
import type { FunctionArg } from "./models/FunctionArg";
import { ReturnTypeBoolean, ReturnTypeNumber, ReturnTypeString, ReturnTypeVoid } from "./enums/ReturnType";
import { ReturnObject } from "./models/ReturnObject";
import { ProtectionType } from "./enums/ProtectionType";
import { MemoryAllocationType } from "./enums/MemoryAllocationType";
import { MemoryBasicInformation } from "./models/MemoryBasicInformation";
import { Register } from "./enums/Register"
import { TriggerType } from "./enums/TriggerType";



declare namespace MemoryJs {
    function openProcess(processIdentifier: number | string): Process;
    function openProcess(processIdentifier: number | string, callback: Callback<Process>): void;

    function closeProcess(handle: number): void;

    function getProcesses(): Process[];
    function getProcesses(callback: Callback<Process[]>): void;

    function findModule(moduleName: string, processId: number): Module;
    function findModule(moduleName: string, processId: number, callback: Callback<Module>): void;

    function getModules(processId: number): Module[];
    function getModules(processId: number, callback: Callback<Module[]>): void;

    function readMemory(handle: number, address: number, dataType: DataTypeBoolean): boolean;
    function readMemory(handle: number, address: number, dataType: DataTypeString): string;
    function readMemory(handle: number, address: number, dataType: DataTypeNumber): number;
    function readMemory(handle: number, address: number, dataType: DataTypeBigInt): bigint;
    function readMemory(handle: number, address: number, dataType: DataTypePointer): number | bigint;
    function readMemory(handle: number, address: number, dataType: DataTypeVector3): Vector3;
    function readMemory(handle: number, address: number, dataType: DataTypeVector4): Vector4;

    function readMemory(handle: number, address: number, dataType: DataTypeBoolean, callback: Callback<boolean>): void;
    function readMemory(handle: number, address: number, dataType: DataTypeString, callback: Callback<string>): void;
    function readMemory(handle: number, address: number, dataType: DataTypeNumber, callback: Callback<number>): void;
    function readMemory(handle: number, address: number, dataType: DataTypeBigInt, callback: Callback<bigint>): void;
    function readMemory(handle: number, address: number, dataType: DataTypePointer, callback: Callback<number | bigint>): void;
    function readMemory(handle: number, address: number, dataType: DataTypeVector3, callback: Callback<Vector3>): void;
    function readMemory(handle: number, address: number, dataType: DataTypeVector4, callback: Callback<Vector4>): void;

    function readBuffer(handle: number, address: number, size: number): Buffer;
    function readBuffer(handle: number, address: number, size: number, callback: Callback<Buffer>): void;

    function writeMemory(handle: number, address: number, value: boolean, dataType: DataTypeBoolean): void;
    function writeMemory(handle: number, address: number, value: string, dataType: DataTypeString): void;
    function writeMemory(handle: number, address: number, value: number, dataType: DataTypeNumber): void;
    function writeMemory(handle: number, address: number, value: bigint, dataType: DataTypeBigInt): void;
    function writeMemory(handle: number, address: number, value: number | bigint, dataType: DataTypePointer): void;
    function writeMemory(handle: number, address: number, value: Vector3, dataType: DataTypeVector3): void;
    function writeMemory(handle: number, address: number, value: Vector4, dataType: DataTypeVector4): void;

    function writeBuffer(handle: number, address: number, buffer: Buffer): void;

    function findPattern(
        handle: number,
        pattern: string,
        flags: SignatureType
    ): number;
    function findPattern(
        handle: number,
        pattern: string,
        flags: SignatureType,
        patternOffset: number
    ): number;
    
    function findPattern(
        handle: number,
        moduleName: string,
        pattern: string,
        flags: SignatureType
    ): number;
    function findPattern(
        handle: number,
        moduleName: string,
        pattern: string,
        flags: SignatureType,
        patternOffset: number
    ): number;

    function findPattern(
        handle: number,
        baseAddress: number,
        pattern: string,
        flags: SignatureType
    ): number;
    function findPattern(
        handle: number,
        baseAddress: number,
        pattern: string,
        flags: SignatureType,
        patternOffset: number
    ): number;

    function findPattern(
        handle: number,
        pattern: string,
        flags: SignatureType,
        callback: Callback<number>
    ): void;
    function findPattern(
        handle: number,
        pattern: string,
        flags: SignatureType,
        patternOffset: number,
        callback: Callback<number>
    ): void;
    
    function findPattern(
        handle: number,
        moduleName: string,
        pattern: string,
        flags: SignatureType,
        callback: Callback<number>
    ): void;
    function findPattern(
        handle: number,
        moduleName: string,
        pattern: string,
        flags: SignatureType,
        patternOffset: number,
        callback: Callback<number>
    ): void;

    function findPattern(
        handle: number,
        baseAddress: number,
        pattern: string,
        flags: SignatureType,
        callback: Callback<number>
    ): void;
    function findPattern(
        handle: number,
        baseAddress: number,
        pattern: string,
        flags: SignatureType,
        patternOffset: number,
        callback: Callback<number>
    ): void;

    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeVoid,
        address: number | bigint
    ): ReturnObject<void>;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeBoolean,
        address: number | bigint
    ): ReturnObject<boolean>;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeNumber,
        address: number | bigint
    ): ReturnObject<number>;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeString,
        address: number | bigint
    ): ReturnObject<string>;

    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeVoid,
        address: number | bigint,
        callback: Callback<ReturnObject<void>>
    ): void;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeBoolean,
        address: number | bigint,
        callback: Callback<ReturnObject<boolean>>
    ): void;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeNumber,
        address: number | bigint,
        callback: Callback<ReturnObject<number>>
    ): void;
    function callFunction(
        handle: number,
        args: FunctionArg[],
        returnType: ReturnTypeString,
        address: number | bigint,
        callback: Callback<ReturnObject<string>>
    ): void;

    function virtualAllocEx(
        handle: number,
        address: number | null,
        size: number,
        allocationType: MemoryAllocationType,
        protection: ProtectionType
    ): number | bigint;
    function virtualAllocEx(
        handle: number,
        address: number | null,
        size: number,
        allocationType: MemoryAllocationType,
        protection: ProtectionType,
        callback: Callback<number | bigint>
    ): void;
    
    function virtualProtectEx(
        handle: number,
        address: number,
        size: number,
        protection: ProtectionType
    ): ProtectionType;
    function virtualProtectEx(
        handle: number,
        address: number,
        size: number,
        protection: ProtectionType,
        callback: Callback<ProtectionType>
    ): void;

    function getRegions(handle: number): (MemoryBasicInformation & { szExeFile?: string})[];
    function getRegions(handle: number, callback: Callback<(MemoryBasicInformation & { szExeFile?: string})[]>): void;

    function virtualQueryEx(handle: number, address: number): MemoryBasicInformation;
    function virtualQueryEx(handle: number, address: number, callback: Callback<MemoryBasicInformation>): void;

    function injectDll(handle: number, dllPath: `${string}.dll`): boolean;
    function injectDll(handle: number, dllPath: `${string}.dll`, callback: Callback<boolean>): void;

    function unloadDll(handle: number, module: number | string): boolean;
    function unloadDll(handle: number, module: number | string, callback: Callback<boolean>): void;

    function openFileMapping(fileName: string): number;

    function mapViewOfFile(
        processHandle: number,
        fileHandle: number
    ): number;
    function mapViewOfFile(
        processHandle: number,
        fileHandle: number,
        offset: number,
        viewSize: number,
        pageProtection: ProtectionType
    ): number;
    function mapViewOfFile(
        processHandle: number,
        fileHandle: number,
        offset: bigint,
        viewSize: bigint,
        pageProtection: ProtectionType
    ): bigint;

    function attachDebugger(processId: number, killOnExit: boolean): boolean;

    function detachDebugger(processId: number): boolean;

    function awaitDebugEvent(hardwareRegister: Register, millisTimeout: number): DebugEvent;

    function handleDebugEvent(processId: number, threadId: number): boolean;

    function setHardwareBreakpoint(
        processId: number,
        address: number,
        hardwareRegister: Register,
        trigger: TriggerType,
        length: number
    ): boolean;

    function removeHardwareBreakpoint(processId: number, hardwareRegister: Register): boolean;

    const Debugger: Debugger;
    
    export import D = DataType;
}

export = MemoryJs