import { MemoryPageType } from "../enums/MemoryPageType"
import { MemoryState } from "../enums/MemoryState"
import { ProtectionType } from "../enums/ProtectionType"

export declare interface MemoryBasicInformation {
    BaseAddress: number
    AllocationBase: number
    AllocationProtect: ProtectionType | 0
    RegionSize: number
    State: MemoryState
    Protect: ProtectionType | 0
    Type: MemoryPageType
}