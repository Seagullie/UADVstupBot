import { Menu } from "../../../Models/Menu"
import { IMenu } from "../../../Models/types"
import { readInMarkdownFileFromMarkdownFolder } from "../../../Utilities/Utilities"

export const MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS = ["Структура", "Рекомендації", "Куди надсилати"]

const MENU_ITEMS = [
  {
    caption: MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS[0],
    linksTo: MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS[0],
  },
  {
    caption: MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS[1],
    linksTo: MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS[1],
  },
  {
    caption: MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS[2],
    linksTo: MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS[2],
  },
]

const MOTIVACIYNII_LIST_MENU_INTRO = readInMarkdownFileFromMarkdownFolder("motyvacijnyj_list_intro.md")

export const MOTIVACIYNII_LIST_MENU: Menu = new Menu({
  introText: MOTIVACIYNII_LIST_MENU_INTRO,
  items: MENU_ITEMS,
})
