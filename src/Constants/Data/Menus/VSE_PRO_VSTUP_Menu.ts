import { Menu, MenuItem } from "../../../Models/Menu"
import { readInMarkdownFileFromMarkdownFolder } from "../../../Utilities/Utilities"

export const VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS = [
  "Умови вступу",
  "Терміни вступної кампанії",
  "Як подати заяву на вступ",
  "Як зареєструвати електронний кабінет вступника",
  "Що означають статуси у електронному кабінеті вступника",
  "Як розрахувати рейтинговий бал",
  "Контакти приймальної комісії",
]

// read in markdown file

let terminy_vstypnoji_kampaniji = readInMarkdownFileFromMarkdownFolder("terminy_vstypnoji_kampaniji_2024.md")
let jak_podaty_zajavy_na_vstup = readInMarkdownFileFromMarkdownFolder("jak_podaty_zajavy_na_vstup.md")
let kontakty_pryjmalnoji_komisiji = readInMarkdownFileFromMarkdownFolder("kontakty_pryjmalnoji_komisiji.md")

const MENU_ITEMS: MenuItem[] = [
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[0],
    linksTo: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[0],
  },
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[1],
    linksTo: terminy_vstypnoji_kampaniji,
  },
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[2],
    linksTo: jak_podaty_zajavy_na_vstup,
  },
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[3],
    linksTo: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[3],
  },
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[4],
    linksTo: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[4],
  },
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[5],
    linksTo: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[5],
  },
  {
    caption: VSE_PRO_VSTUP_2024_SUBMENU_ITEM_CAPTIONS[6],
    linksTo: kontakty_pryjmalnoji_komisiji,
  },
]

export const VSE_PRO_VSTUP_MENU: Menu = {
  items: MENU_ITEMS,
}
