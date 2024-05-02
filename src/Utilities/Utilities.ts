import fs = require("fs")
import path = require("path")

export function escapeSpecialTgChars(text: string) {
  return (
    text
      .replace(/\*\*/g, "*")

      // escape unescaped "-" chars
      .replace(/(?<!\\)-/g, "\\-")
      // escape unescaped "." chars
      .replace(/(?<!\\)\./g, "\\.")
      // escape unescaped "(" chars
      .replace(/(?<!\\)\(/g, "\\(")
      // escape unescaped ")" chars
      .replace(/(?<!\\)\)/g, "\\)")
      // escape unescaped "=" chars
      .replace(/(?<!\\)=/g, "\\=")

    // other chars to escape:
    // '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!' must be escaped with the preceding character '\'.
  )
}

/**
 * Reads in a markdown file.
 */
export function readInMarkdownFile(filePath: string) {
  let fileContent = fs.readFileSync(filePath, "utf8")
  // collapse double stars into single stars, as telegram doesn't support headers

  // return escapeSpecialTgChars(fileContent)
  return fileContent
}

export function readInMarkdownFileFromMarkdownFolder(fileName: string) {
  const filePath = path.join("media/markdown", fileName)
  return readInMarkdownFile(filePath)
}
