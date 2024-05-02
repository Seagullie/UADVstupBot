import { CommandCallbackWithCtx, TGBotFramework } from "telegram-bot-framework"
import { MAIN_MENU, MAIN_MENU_ITEM_CAPTIONS } from "../../Constants/Data/Menus/MainMenu"
import { TextButton } from "./types/TextButton"
import { UADVstupBot } from "../../UADVstupBot"

export function getTextButton(text: string): TextButton {
  // unescape any escaped characters
  text = text.replace(/\\(.)/g, "$1")

  return { text }
}

export function ArrayOfTextButtons(texts: string[]) {
  return texts.map((text) => getTextButton(text))
}

export function StackKeyboard(buttons: TextButton[]) {
  // wrap each button in an array
  let wrappedButtons = buttons.map((button) => [button])
  return wrappedButtons
}

const EXAMPLE_MENU_ITEMS = ["🎓 Список спеціальностей", "📄 Документи", "🤝 Контакти"]

export const SendMainMenu: CommandCallbackWithCtx = async (msg, match, botFramework: UADVstupBot) => {
  let bot = botFramework.bot

  let text = "Ось меню зі основними функціями ⬇"
  botFramework.sendMenu(msg.chat.id, text, MAIN_MENU)
}
