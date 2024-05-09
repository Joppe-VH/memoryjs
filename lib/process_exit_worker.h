#pragma once
#ifndef PROCESS_EXIT_WORKER_H
#define PROCESS_EXIT_WORKER_H
#define WIN32_LEAN_AND_MEAN

#include <windows.h>
#include <chrono>
#include <thread>
#include <napi.h>

using namespace Napi;

class ProcessExitWorker : public AsyncWorker {
public:
  ProcessExitWorker(HANDLE handle, Function& callback)
  : AsyncWorker(callback), handle(handle) {}

  ~ProcessExitWorker() {}

void Execute() override {
  do {
    std::this_thread::sleep_for(std::chrono::milliseconds(500));
  }
  while (WaitForSingleObject(handle, 0) == WAIT_TIMEOUT);
}

private:
  HANDLE handle;
};

#endif
#pragma once
