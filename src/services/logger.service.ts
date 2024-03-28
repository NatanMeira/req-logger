import { asyncLocalStorageService } from "./async-local-storage.service";
import { winstonLogger } from "../winston";

export class LoggerService {
  constructor(private readonly context?: string) {}

  log(message: string) {
    winstonLogger.info({
      message,
      context: this.context,
      requestId: asyncLocalStorageService.getRequestId(),
    });
  }

  error(message: string) {
    winstonLogger.error({
      message,
      context: this.context,
      requestId: asyncLocalStorageService.getRequestId(),
    });
  }

  warn(message: string) {
    winstonLogger.warn({
      message,
      context: this.context,
      requestId: asyncLocalStorageService.getRequestId(),
    });
  }

  debug(message: string) {
    winstonLogger.debug({
      message,
      context: this.context,
      requestId: asyncLocalStorageService.getRequestId(),
    });
  }

  trace(message: string) {
    winstonLogger.verbose({
      message,
      context: this.context,
      requestId: asyncLocalStorageService.getRequestId(),
    });
  }
}
