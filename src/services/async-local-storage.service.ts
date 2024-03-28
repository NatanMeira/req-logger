import { AsyncLocalStorage } from "async_hooks";

const als = new AsyncLocalStorage();

class AsyncLocalStorageService {
  getRequestId() {
    return als.getStore();
  }

  setRequestId(requestId: string, nextFunction: Function) {
    als.run(requestId, () => {
      nextFunction();
    });
  }
}

export const asyncLocalStorageService = new AsyncLocalStorageService();
