import { Menu } from "../../../Models/Menu"
import { readInMarkdownFileFromMarkdownFolder } from "../../../Utilities/Utilities"

export const SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS = [
  "Перелік спеціальностей",
  "Освітні програми",
  "Вартість навчання",
  "Предмети та коефіцієнти для вступу",
]

let perelik_specialnostej = readInMarkdownFileFromMarkdownFolder("perelik_specialnostej.md")

const MENU_ITEMS = [
  {
    caption: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[0],
    linksTo: perelik_specialnostej,
  },
  {
    caption: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[1],
    linksTo: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[1],
  },
  {
    caption: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[2],
    linksTo: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[2],
  },
  {
    caption: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[3],
    linksTo: SPECIALTIES_UAD_MENU_ITEMS_CAPTIONS[3],
  },
]

export const SPECIALTIES_UAD_MENU: Menu = {
  items: MENU_ITEMS,
}
