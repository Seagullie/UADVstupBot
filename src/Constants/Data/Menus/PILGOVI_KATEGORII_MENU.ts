import { Menu } from "../../../Models/Menu"

export const PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS = [
  "Умови вступу за пільгою",
  "Документи, що підтверджують пільгу",
  "Соціальна стипендія",
  "Крим Донбас Україна (про програму)",
]

const MENU_ITEMS = [
  {
    caption: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[0],
    linksTo: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[0],
  },
  {
    caption: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[1],
    linksTo: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[1],
  },
  {
    caption: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[2],
    linksTo: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[2],
  },
  {
    caption: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[3],
    linksTo: PILGOVI_KATEGORII_MENU_ITEMS_CAPTIONS[3],
  },
]

export const PILGOVI_KATEGORII_MENU: Menu = {
  items: MENU_ITEMS,
}
