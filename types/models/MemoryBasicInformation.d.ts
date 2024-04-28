import { MemoryPageType } from "../unions/MemoryPageType"
import { MemoryState } from "../unions/MemoryState"
import { ProtectionType } from "../unions/ProtectionType"

export declare interface MemoryBasicInformation {
    BaseAddress: number
    AllocationBase: number
    AllocationProtect: ProtectionType | 0
    RegionSize: number
    State: MemoryState
    Protect: ProtectionType | 0
    Type: MemoryPageType
}