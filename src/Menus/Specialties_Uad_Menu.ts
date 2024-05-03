import TelegramBot = require("node-telegram-bot-api")
import { Menu } from "../Models/Menu"
import { readInMarkdownFileFromMarkdownFolder } from "../Utilities/Utilities"
import { UADVstupBot } from "../UADVstupBot"

import fs = require("fs")

const SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS = [
  "Перелік спеціальностей",
  "Освітні програми",
  "Вартість навчання",
  "Предмети та коефіцієнти для вступу",
]

const folderName = "specialnosti_uad/"
let perelik_specialnostej = readInMarkdownFileFromMarkdownFolder(folderName + "perelik_specialnostej.md")

// read in image
let pathToImage = "media/images/weight_coeff.png"
let weightCoeffsImageBuffer = fs.readFileSync(pathToImage)

const MENU_ITEMS = [
  {
    caption: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[0],
    linksTo: perelik_specialnostej,
  },
  // {
  //   caption: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[1],
  //   linksTo: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[1],
  // },
  // {
  //   caption: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[2],
  //   linksTo: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[2],
  // },
  {
    caption: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[3],
    linksTo: async (botFramework: UADVstupBot, msg: TelegramBot.Message) => {
      // send image with weight coeffs
      await botFramework.bot.sendPhoto(msg.chat.id, weightCoeffsImageBuffer)
    },
  },
]

export const SPECIALTIES_UAD_MENU: Menu = new Menu({
  items: MENU_ITEMS,
})
