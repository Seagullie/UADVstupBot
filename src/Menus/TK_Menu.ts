// menus and submenus buttons

import dedent = require("dedent-js")
import { Menu } from "../Models/Menu"
import { MenuItem } from "../Models/types"

// творчий конкурс
export const TK_MENU_ITEMS_CAPTIONS = ["Програми ТК", "Локація та розклад ТК", "Контакти", "Реєстрація на ТК"]

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
  // {
  //   caption: TK_MENU_ITEMS_CAPTIONS[1],
  //   linksTo: TK_MENU_ITEMS_CAPTIONS[1],
  // },
  // {
  //   caption: TK_MENU_ITEMS_CAPTIONS[2],
  //   linksTo: TK_MENU_ITEMS_CAPTIONS[2],
  // },
  // {
  //   caption: TK_MENU_ITEMS_CAPTIONS[3],
  //   linksTo: TK_MENU_ITEMS_CAPTIONS[3],
  // },
]

export const TK_MENU: Menu = new Menu({
  items: TK_MENU_ITEMS,
})
