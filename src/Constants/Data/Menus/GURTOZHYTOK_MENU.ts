import { Menu } from "../../../Models/Menu"

export const GURTOZHYTOK_MENU_ITEMS_CAPTIONS = ["Умови Поселення", "Оплата", "Контакти Студ. Містечка"]

const MENU_ITEMS = [
  {
    caption: GURTOZHYTOK_MENU_ITEMS_CAPTIONS[0],
    linksTo: GURTOZHYTOK_MENU_ITEMS_CAPTIONS[0],
  },
  {
    caption: GURTOZHYTOK_MENU_ITEMS_CAPTIONS[1],
    linksTo: GURTOZHYTOK_MENU_ITEMS_CAPTIONS[1],
  },
  {
    caption: GURTOZHYTOK_MENU_ITEMS_CAPTIONS[2],
    linksTo: GURTOZHYTOK_MENU_ITEMS_CAPTIONS[2],
  },
]

export const GURTOZHYTOK_MENU: Menu = {
  items: MENU_ITEMS,
}
