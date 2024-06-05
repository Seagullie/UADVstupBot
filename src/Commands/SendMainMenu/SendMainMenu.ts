import { CommandCallbackWithCtx, TGBotFramework } from "telegram-bot-framework"
import { MAIN_MENU } from "../../Menus/MainMenu"
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

export const SendMainMenu: CommandCallbackWithCtx = async (msg, match, botFramework: UADVstupBot) => {
  let bot = botFramework.bot

  let text = "Ось меню зі основними функціями ⬇"
  return botFramework.sendMenu(msg.chat.id, text, MAIN_MENU)
}
