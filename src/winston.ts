import * as Winston from "Winston";
const { combine, timestamp, prettyPrint, json } = Winston.format;

export const winstonLogger = Winston.createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    json(),
    prettyPrint()
  ),
  transports: [new Winston.transports.Console()],
});
