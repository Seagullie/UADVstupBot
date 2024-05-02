import TelegramBot = require("node-telegram-bot-api")
import { Menu } from "../../../Models/Menu"
import { MenuItem } from "../../../Models/types"
import { UADVstupBot } from "../../../UADVstupBot"
import { readInMarkdownFileFromMarkdownFolder } from "../../../Utilities/Utilities"
import { APPLICATION_STATUS_MENU } from "./ApplicationStatusMenu"

export const VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS = [
  "Умови вступу",
  "Терміни вступної кампанії",
  "Як подати заяву на вступ",
  "Як зареєструвати електронний кабінет вступника",
  "Що означають статуси у електронному кабінеті вступника",
  "Вагові коефіцієнти предметів для вступу на бакалаврат",
  "Контакти приймальної комісії",
]

// read in markdown files

const folderName = "vse_pro_vstup/"

let terminy_vstypnoji_kampaniji = readInMarkdownFileFromMarkdownFolder(
  folderName + "terminy_vstypnoji_kampaniji_2024.md"
)
let jak_podaty_zajavy_na_vstup = readInMarkdownFileFromMarkdownFolder(folderName + "jak_podaty_zajavy_na_vstup.md")
let kontakty_pryjmalnoji_komisiji = readInMarkdownFileFromMarkdownFolder(
  folderName + "kontakty_pryjmalnoji_komisiji.md"
)

const MENU_ITEMS: MenuItem[] = [
  // {
  //   caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[0],
  //   linksTo: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[0],
  // },
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[1],
    linksTo: terminy_vstypnoji_kampaniji,
  },
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[2],
    linksTo: jak_podaty_zajavy_na_vstup,
  },
  // {
  //   caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[3],
  //   linksTo: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[3],
  // },
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[4],
    linksTo: APPLICATION_STATUS_MENU, // statusy_u_elektronnomy_kabineti,
  },
  // {
  //   caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[5],
  //   ,
  // },
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[6],
    linksTo: kontakty_pryjmalnoji_komisiji,
  },
]

const VSE_PRO_VSTUP_MENU: Menu = new Menu({
  // parentMenu: MAIN_MENU,
  items: [],
})

MENU_ITEMS.forEach((item) => {
  if (item.linksTo instanceof Menu) {
    VSE_PRO_VSTUP_MENU.addSubmenuItem(item)
  } else {
    VSE_PRO_VSTUP_MENU.addItem(item)
  }
})

export { VSE_PRO_VSTUP_MENU }
