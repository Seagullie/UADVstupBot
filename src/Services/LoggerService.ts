// https://www.npmjs.com/package/winston

import * as winston from "winston"

const { combine, timestamp, printf } = winston.format

const PATH_TO_COMBINED_LOGS = "logs/combined.log"
const PATH_TO_ERROR_LOGS = "logs/errors.log"

// Define custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`
})

// Create a logger
const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
})

// add transports
logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), logFormat),
  })
)
logger.add(
  new winston.transports.File({
    filename: PATH_TO_COMBINED_LOGS,
    format: winston.format.combine(timestamp(), logFormat),
  })
)

// add a transport for errors
logger.add(
  new winston.transports.File({
    filename: PATH_TO_ERROR_LOGS,
    level: "error",
    format: winston.format.combine(timestamp(), logFormat),
  })
)

// add a transport for user submitted data
logger.add(
  new winston.transports.File({
    level: ""
    filename: "logs/user-submitted-data.log",
    format: winston.format.combine(timestamp(), logFormat),
  })
)

function toJSON(obj: unknown): string {
  return JSON.stringify(obj, null, 2)
}

export function hijackConsoleMethods() {
  // Hijack console methods
  console.log = (...args: unknown[]) => logger.info(args.map(toJSON).join(" "))
  console.error = (...args: unknown[]) => logger.error(args.map(toJSON).join(" "))
  console.warn = (...args: unknown[]) => logger.warn(args.map(toJSON).join(" "))
  console.debug = (...args: unknown[]) => logger.debug(args.map(toJSON).join(" "))
}

// Example usage
// console.log("This is an info message")
// console.error("This is an error message")
// console.warn("This is a warning message")
// console.debug("This is a debug message")

// export default logger
