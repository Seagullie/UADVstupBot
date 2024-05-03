import dedent = require("dedent-js")
import { Menu } from "../Models/Menu"
import { readInMarkdownFileFromMarkdownFolder } from "../Utilities/Utilities"
import TelegramBot = require("node-telegram-bot-api")
import { UADVstupBot } from "../UADVstupBot"
import { TelegramCommand } from "telegram-bot-framework"
import { MenuItem } from "../Models/types"
import { SUBSIDY_DOCS_MENU } from "./SubsidyDocsMenu"

export const PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS = [
  "Умови вступу за пільгою",
  "Документи, що підтверджують пільгу",
  "Соціальна стипендія",
  "Про програму Крим Донбас Україна",
]

// read in mardkown files
const folderName = "pilgy/"
const OSVITNI_CENTRY = readInMarkdownFileFromMarkdownFolder(folderName + "osvitni_centry.md")
const soc_stypendija = readInMarkdownFileFromMarkdownFolder(folderName + "soc_stypendija.md")

let optionsMarkdownV2WithoutPagePreviews: TelegramBot.SendMessageOptions = {
  parse_mode: "MarkdownV2",
  disable_web_page_preview: true,
}

const MENU_ITEMS: MenuItem[] = [
  // {
  //   caption: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[0],
  //   linksTo: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[0],
  // },
  // {
  //   caption: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[1],
  //   linksTo: async (botFram: UADVstupBot, msg: TelegramBot.Message) => {
  //     associateSlashCommandsWithCategories(botFram)

  //     await botFram.sendMessage(
  //       msg.chat.id,
  //       docIntro + "\n\n" + titlesWithSlashCommands1_7,
  //       optionsMarkdownV2WithoutPagePreviews
  //     )
  //     await botFram.sendMessage(msg.chat.id, titlesWithSlashCommands7_15, optionsMarkdownV2WithoutPagePreviews)

  //     // await botFram.sendMenu(msg.chat.id, "Документи, що підтверджують пільгу", PAGINATION_MENU)
  //   },
  // },
  {
    caption: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[1],
    linksTo: SUBSIDY_DOCS_MENU,
  },
  {
    caption: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[2],
    linksTo: soc_stypendija,
  },
  {
    caption: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[3],
    linksTo: OSVITNI_CENTRY,
  },
]

// read in intro
const PILGOVI_KATEGORII_MENU_INTRO = readInMarkdownFileFromMarkdownFolder("pilgy/intro.md")

const PILGOVI_KATEGORII_MENU: Menu = new Menu({
  items: [],
  introText: PILGOVI_KATEGORII_MENU_INTRO,
})

MENU_ITEMS.forEach((item) => {
  if (item.linksTo instanceof Menu) {
    PILGOVI_KATEGORII_MENU.addSubmenuItem(item)
  } else {
    PILGOVI_KATEGORII_MENU.addItem(item)
  }
})

export { PILGOVI_KATEGORII_MENU }
