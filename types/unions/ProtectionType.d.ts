

export declare type ProtectionType =
    | 0x01        // PAGE_NOACCESS                      
    | 0x02        // PAGE_READONLY                      
    | 0x04        // PAGE_READWRITE                      
    | 0x08        // PAGE_WRITECOPY                      
    | 0x10        // PAGE_EXECUTE                      
    | 0x20        // PAGE_EXECUTE_READ                      
    | 0x40        // PAGE_EXECUTE_READWRITE                      
    | 0x80        // PAGE_EXECUTE_WRITECOPY                      
    | 0x100       // PAGE_GUARD                         
    | 0x200       // PAGE_NOCACHE                         
    | 0x400       // PAGE_WRITECOMBINE                         
    | 0x80000000  // PAGE_ENCLAVE_THREAD_CONTROL                        
    | 0x40000000  // PAGE_TARGETS_NO_UPDATE                        
    | 0x40000000  // PAGE_TARGETS_INVALID                        
    | 0x20000000; // PAGE_ENCLAVE_UNVALIDATED                        