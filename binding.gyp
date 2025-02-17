{
  "targets": [
    {
      "target_name": "memoryjs",
      "include_dirs" : [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "sources": [
        "lib/memoryjs.cc",
        "lib/memory.cc",
        "lib/process.cc",
        "lib/module.cc",
        "lib/pattern.cc",
        "lib/functions.cc",
        "lib/debugger.cc",
        "lib/symbols.cc"
      ],
      "libraries": [ "dbghelp.lib" ],
      "dll_files": [ "dbghelp.dll" ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
    }
  ]
}
