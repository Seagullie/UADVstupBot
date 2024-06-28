// menus and submenus buttons

import dedent = require("dedent-js")
import { Menu } from "../Models/Menu"
import { MenuItem } from "../Models/types"

import fs = require("fs")
import TelegramBot = require("node-telegram-bot-api")
import { UADVstupBot } from "../UADVstupBot"

// творчий конкурс
export const TK_MENU_ITEMS_CAPTIONS = [
  "Програми ТК",
  "Розклад ТК",
  "Розклад співбесід",
  "Поселення в гуртожиток під час ТК",
]

// read in images
let pathToImage = "media/images/schedule_TK.jpg"
let scheduleTkImageBuffer = fs.readFileSync(pathToImage)

pathToImage = "media/images/schedule_interview.jpg"
let scheduleInterviewBuffer = fs.readFileSync(pathToImage)

let linkToDormitorySettlingGoogleForms = "https://forms.gle/TaBjMF5Lx6jMEisi7"

let tkPrograms = dedent`
  
  📌 Програми ТК:
  
  1️⃣  [Програма ТК "Дизайн"](https://drive.google.com/file/d/1gSfBtlCw8epX4tr0Bt1wp3gFST-wecia/view)
  2️⃣  [Програма ТК "Образотворче мистецтво"](https://drive.google.com/file/d/1qy8bFYLziUsQPZ0krLloQ2lzXeUQxA_1/view)
`

const TK_MENU_ITEMS: MenuItem[] = [
  {
    caption: TK_MENU_ITEMS_CAPTIONS[0],
    linksTo: tkPrograms,
  },
  {
    caption: TK_MENU_ITEMS_CAPTIONS[1],
    linksTo: async (botFramework: UADVstupBot, msg: TelegramBot.Message) => {
      // send image
      await botFramework.bot.sendPhoto(msg.chat.id, scheduleTkImageBuffer)
    },
  },
  {
    caption: TK_MENU_ITEMS_CAPTIONS[2],
    linksTo: async (botFramework: UADVstupBot, msg: TelegramBot.Message) => {
      // send image
      await botFramework.bot.sendPhoto(msg.chat.id, scheduleInterviewBuffer)
    },
  },
  {
    caption: TK_MENU_ITEMS_CAPTIONS[3],
    linksTo: async (botFramework: UADVstupBot, msg: TelegramBot.Message) => {
      // send image
      await botFramework.bot.sendMessage(
        msg.chat.id,
        `Для поселення в гуртожиток під час ТК, заповніть [Google форму](${linkToDormitorySettlingGoogleForms})`,
        {
          parse_mode: "Markdown",
        }
      )
    },
  },
]

export const TK_MENU: Menu = new Menu({
  items: TK_MENU_ITEMS,
})
