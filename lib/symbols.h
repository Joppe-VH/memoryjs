#pragma once
#ifndef SYMBOLS_H
#define SYMBOLS_H
#define WIN32_LEAN_AND_MEAN

class symbols {
public:

  symbols();
  ~symbols();


  static BOOL initialize(HANDLE hProcess);
  static BOOL cleanup(HANDLE hProcess);
  static UINT_PTR getAddress(HANDLE hProcess, const char* symbolName);
};

#endif
#pragma once
