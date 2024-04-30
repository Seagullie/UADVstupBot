import fs = require("fs")
import path = require("path")

/**
 * Reads in a markdown file and escapes special characters so that they can be sent in a telegram message
 */
export function readInMarkdownFile(filePath: string) {
  let fileContent = fs
    .readFileSync(filePath, "utf8")
    // collapse double stars into single stars, as telegram doesn't support headers
    .replace(/\*\*/g, "*")

    // escape unescaped "-" chars
    .replace(/(?<!\\)-/g, "\\-")
    // escape unescaped "." chars
    .replace(/(?<!\\)\./g, "\\.")
    // escape unescaped "(" chars
    .replace(/(?<!\\)\(/g, "\\(")
    // escape unescaped ")" chars
    .replace(/(?<!\\)\)/g, "\\)")

  // other chars to escape:
  // '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!' must be escaped with the preceding character '\'.

  return fileContent
}

export function readInMarkdownFileFromMarkdownFolder(fileName: string) {
  const filePath = path.join("media/markdown", fileName)
  return readInMarkdownFile(filePath)
}
