import dedent = require("dedent-js")
import { Menu } from "../../../Models/Menu"
import { MenuItem } from "../../../Models/types"
import { readInMarkdownFileFromMarkdownFolder, unescape } from "../../../Utilities/Utilities"

// read in markdown files

const folderName = "vse_pro_vstup/statusy/"

let statusy_u_elektronnomy_kabineti_general = readInMarkdownFileFromMarkdownFolder(folderName + "vstup_general.md")
let statusy_u_elektronnomy_kabineti_vyprobuvannya = readInMarkdownFileFromMarkdownFolder(
  folderName + "vyprobuvannja.md"
)

let statusy_u_elektronnomy_kabineti =
  statusy_u_elektronnomy_kabineti_vyprobuvannya + statusy_u_elektronnomy_kabineti_general

// split text by "*«"
let statusesArray = statusy_u_elektronnomy_kabineti.split("*«")

// remove empty strings
statusesArray = statusesArray.filter((part) => part !== "" && part !== " ")

// add "*«" back to the beginning of each part
statusesArray = statusesArray.map((part) => "*«" + part)

let statusesAndTheirDescriptions = statusesArray

// extract status names. They are in the format "«StatusName»"
let statusNames = statusesArray.map((part) => part.match(/«(.*?)»/)?.[1])

// unescape status names
statusNames = statusNames.map(unescape)

// zip status names with their descriptions
let statusNamesAndDescriptions = statusNames.map((name, index) => ({
  name,
  description: statusesAndTheirDescriptions[index],
}))

const MENU_ITEMS: MenuItem[] = statusNamesAndDescriptions.map((n_d_obj) => ({
  caption: n_d_obj.name,
  linksTo: n_d_obj.description,
}))

let introText = dedent`
Насправді, можливих статусів у заяви є багато\\! Скористайтеся меню нижче, щоб дізнатися, що означає кожен з них\\.
`

export const APPLICATION_STATUS_MENU: Menu = new Menu({
  introText,
  items: MENU_ITEMS,
})
