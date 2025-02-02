import { EventEmitter } from "events";
import type { Callback } from "./Callback";

export declare interface Process extends EventEmitter {
    readonly dwSize: number;
    readonly th32ProcessID: number;
    readonly cntThreads: number;
    readonly th32ParentProcessID: number;
    readonly pcPriClassBase: number;
    readonly szExeFile: string;
    readonly modBaseAddr: number;
    readonly handle: number;

    once(event: 'exit', callback: () => void): this;
    closeHandle(): boolean;
    hasKnownClosedHandle(): boolean;

    symbolsInitialized(): boolean;
    initializeSymbols(): void;
    cleanupSymbols(): void;

    getSymbolAddress(symbolName: string): number;
    getSymbolAddress(symbolName: string, callback: Callback<number>): void;
}