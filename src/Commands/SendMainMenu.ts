import { CommandCallbackWithCtx, TGBotFramework } from "telegram-bot-framework"
import { MAIN_MENU_ITEM_CAPTIONS } from "../Constants/Data/Menus/MainMenu"

type TextButton = {
  text: string
}

export function TextButton(text: string): TextButton {
  return { text }
}

export function ArrayOfTextButtons(texts: string[]) {
  return texts.map((text) => TextButton(text))
}

export function StackKeyboard(buttons: TextButton[]) {
  // wrap each button in an array
  let wrappedButtons = buttons.map((button) => [button])
  return wrappedButtons
}

const EXAMPLE_MENU_ITEMS = ["🎓 Список спеціальностей", "📄 Документи", "🤝 Контакти"]

export const SendMainMenu: CommandCallbackWithCtx = async (msg, match, botFramework: TGBotFramework) => {
  let bot = botFramework.bot
  // should send keyboard with buttons
  bot.sendMessage(msg.chat.id, "Ось меню зі основними функціями ⬇", {
    reply_markup: {
      keyboard: StackKeyboard(ArrayOfTextButtons(MAIN_MENU_ITEM_CAPTIONS)),
      resize_keyboard: true,
    },
  })
}
