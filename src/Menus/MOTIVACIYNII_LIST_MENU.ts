import { Menu } from "../Models/Menu"
import { readInMarkdownFileFromMarkdownFolder } from "../Utilities/Utilities"

const MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS = ["Структура", "Обсяг", "Критерії оцінювання"]

const folderName = "motyvacijnyj_list/"

// read in mardkown files
let struktura = readInMarkdownFileFromMarkdownFolder(folderName + "struktura_ta_zmist_motyvacijnogo_lysta.md")
let obsjag = readInMarkdownFileFromMarkdownFolder(folderName + "obsjag.md")
let kryteriji = readInMarkdownFileFromMarkdownFolder(folderName + "kryteriji.md")

const MENU_ITEMS = [
  {
    caption: MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS[0],
    linksTo: struktura,
  },
  {
    caption: MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS[1],
    linksTo: obsjag,
  },
  {
    caption: MOTIVACIYNII_LIST_MENU_ITEMS_CAPTIONS[2],
    linksTo: kryteriji,
  },
]

const MOTIVACIYNII_LIST_MENU_INTRO = readInMarkdownFileFromMarkdownFolder(
  "motyvacijnyj_list/motyvacijnyj_list_intro.md"
)

export const MOTIVACIYNII_LIST_MENU: Menu = new Menu({
  introText: MOTIVACIYNII_LIST_MENU_INTRO,
  items: MENU_ITEMS,
})
