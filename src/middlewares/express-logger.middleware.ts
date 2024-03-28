import { asyncLocalStorageService } from "../services/async-local-storage.service";
import { winstonLogger } from "../winston";
import { randomUUID } from "crypto";

export const ExpressLoggerMiddleware = (
  request: any,
  response: any,
  nextFunction: Function
) => {
  const requestId = request.headers?.requestId || randomUUID();
  const startTime = new Date().getTime();
  const { method, originalUrl } = request;

  winstonLogger.log({
    level: "info",
    context: "Request",
    url: originalUrl,
    method,
    requestId,
    body: request.body,
    message: "Request received",
  });

  response.on("finish", () => {
    const endTime = new Date().getTime();
    const { statusCode } = response;
    const contentLength = response.get("content-length");
    winstonLogger.log({
      level: "info",
      context: "Response",
      url: originalUrl,
      statusCode,
      method,
      duration: endTime - startTime + "ms",
      contentLength,
      requestId,
      body: response.body,
      message: "Request completed",
    });
  });

  asyncLocalStorageService.setRequestId(requestId, nextFunction);
};
