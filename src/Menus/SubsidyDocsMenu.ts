import dedent = require("dedent-js")
import TelegramBot = require("node-telegram-bot-api")
import { TelegramCommand } from "telegram-bot-framework"
import { Menu } from "../Models/Menu"
import { UADVstupBot } from "../UADVstupBot"
import { readInMarkdownFileFromMarkdownFolder } from "../Utilities/Utilities"

// read in mardkown files
const folderName = "pilgy/"

const docs = readInMarkdownFileFromMarkdownFolder(folderName + "docs.md")

// docs is a numbered list. each point has a title and description

let docIntro = dedent`Перелік категорій студентів, які мають право на отримання соціальної стипендії\\. Для зручності, усі категорії розділено на дві групи: категорії 1\\-7 та категорії 7\\-15\\.`

// process docs

// split the docs into categories by numbers that start with optional asterisk an end with a dot
let docCategories = docs.split(/(?:\*)*\d+\\\./).filter((x) => x && x.length > 0)
let docCategoriesTrimmed = docCategories.map((x) => x.trim())
// each category is a single line
let docCategoriesTitles = docCategories.map((x) => x.split("\n")[0])
let docCategoriesTitlesTrimmed = docCategoriesTitles.map((x) => x.trim())

// remove all asterisks, then wrap each title in asterisks
let docCategoriesTitlesTrimmedCorrected = docCategoriesTitlesTrimmed.map((x) => "*" + x.replace(/\*/g, "") + "*")

let titlesWithSlashCommandsBelow = docCategoriesTitlesTrimmedCorrected.map((x, i) => x + `\n /doc\\_${i + 1}`)

let titlesWithSlashCommands1_7 = titlesWithSlashCommandsBelow.slice(0, 7).join("\n\n")
let titlesWithSlashCommands7_15 = titlesWithSlashCommandsBelow.slice(7).join("\n\n")

let optionsMarkdownV2WithoutPagePreviews: TelegramBot.SendMessageOptions = {
  parse_mode: "MarkdownV2",
  disable_web_page_preview: true,
}

let formatExplainer = dedent`Щоб переглянути необхідні документи для певної категорії, натисніть на слеш команду під нею`

// pagination menu
// TODO: refactor the way associated slash commands are added
const SUBSIDY_DOCS_MENU = new Menu({
  items: [
    {
      caption: "Категорії 1-7",
      linksTo: async (bot: UADVstupBot, msg: TelegramBot.Message) => {
        associateSlashCommandsWithCategories(bot)

        // send format explainer
        await bot.sendMessage(msg.chat.id, formatExplainer)

        await bot.sendMessage(msg.chat.id, titlesWithSlashCommands1_7, optionsMarkdownV2WithoutPagePreviews)
      },
    },
    {
      caption: "Категорії 7-15",
      linksTo: async (bot: UADVstupBot, msg: TelegramBot.Message) => {
        associateSlashCommandsWithCategories(bot)

        // send format explainer
        await bot.sendMessage(msg.chat.id, formatExplainer)

        await bot.sendMessage(msg.chat.id, titlesWithSlashCommands7_15, optionsMarkdownV2WithoutPagePreviews)
      },
    },
  ],

  introText: docIntro,
})

/**
 * Associates slash commands with categories. This function should only be called once, thus the completed flag.
 */
function associateSlashCommandsWithCategories(bot: UADVstupBot) {
  // @ts-expect-error
  if (associateSlashCommandsWithCategories.completed) return

  let slashCommands: TelegramCommand[] = titlesWithSlashCommandsBelow.map((x, i) => ({
    regexp: `doc_${i + 1}`,
    callback: async (msg: TelegramBot.Message) => {
      let docList = docCategoriesTrimmed[i].split("\n").slice(1).join("\n")

      await bot.sendMessage(msg.chat.id, docList, optionsMarkdownV2WithoutPagePreviews)
    },
    desc: "doc",
  }))

  slashCommands.forEach((c) => bot.onCommand(c))

  // @ts-expect-error
  associateSlashCommandsWithCategories.completed = true
}

export { SUBSIDY_DOCS_MENU }
