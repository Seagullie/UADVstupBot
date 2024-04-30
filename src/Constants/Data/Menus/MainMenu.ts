// menus and submenus buttons

import { Menu, MenuItem } from "../../../Models/Menu"
import { GURTOZHYTOK_MENU } from "./GURTOZHYTOK_MENU"
import { MOTIVACIYNII_LIST_MENU } from "./MOTIVACIYNII_LIST_MENU"
import { PILGOVI_KATEGORII_MENU } from "./PILGOVI_KATEGORII_MENU"
import { SPECIALTIES_UAD_MENU } from "./Specialties_Uad_Menu"
import { TK_MENU } from "./TK_Menu"
import { VSE_PRO_VSTUP_MENU } from "./VSE_PRO_VSTUP_Menu"

export const MAIN_MENU_ITEM_CAPTIONS = [
  "📍 ВСЕ ПРО ВСТУП 2024",
  "📍 ТВОРЧИЙ КОНКУРС (ТК)",
  "📍 СПЕЦІАЛЬНОСТІ УАД",
  "📍 ПІЛЬГОВІ КАТЕГОРІЇ",
  "📍 МОТИВАЦІЙНИЙ ЛИСТ(МЛ)",
  "📍 ГУРТОЖИТОК",
]

const MAIN_MENU_ITEMS: MenuItem[] = [
  {
    caption: MAIN_MENU_ITEM_CAPTIONS[0],
    linksTo: VSE_PRO_VSTUP_MENU,
  },
  {
    caption: MAIN_MENU_ITEM_CAPTIONS[1],
    linksTo: TK_MENU,
  },
  {
    caption: MAIN_MENU_ITEM_CAPTIONS[2],
    linksTo: SPECIALTIES_UAD_MENU,
  },
  {
    caption: MAIN_MENU_ITEM_CAPTIONS[3],
    linksTo: PILGOVI_KATEGORII_MENU,
  },
  {
    caption: MAIN_MENU_ITEM_CAPTIONS[4],
    linksTo: MOTIVACIYNII_LIST_MENU,
  },
  {
    caption: MAIN_MENU_ITEM_CAPTIONS[5],
    linksTo: GURTOZHYTOK_MENU,
  },
]

export const MAIN_MENU: Menu = {
  isMainMenu: true,
  items: MAIN_MENU_ITEMS,
}
