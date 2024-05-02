// menus and submenus buttons

import { Menu } from "../../../Models/Menu"
import { MenuItem } from "../../../Models/types"

// творчий конкурс
export const TK_MENU_ITEMS_CAPTIONS = ["Програма ТК", "Локація та розклад ТК", "Контакти", "Реєстрація на ТК"]

const TK_MENU_ITEMS: MenuItem[] = [
  {
    caption: TK_MENU_ITEMS_CAPTIONS[0],
    linksTo: TK_MENU_ITEMS_CAPTIONS[0],
  },
  {
    caption: TK_MENU_ITEMS_CAPTIONS[1],
    linksTo: TK_MENU_ITEMS_CAPTIONS[1],
  },
  {
    caption: TK_MENU_ITEMS_CAPTIONS[2],
    linksTo: TK_MENU_ITEMS_CAPTIONS[2],
  },
  {
    caption: TK_MENU_ITEMS_CAPTIONS[3],
    linksTo: TK_MENU_ITEMS_CAPTIONS[3],
  },
]

export const TK_MENU: Menu = new Menu({
  items: TK_MENU_ITEMS,
})
