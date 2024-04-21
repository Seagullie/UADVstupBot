import { CommandCallbackWithCtx, TGBotFramework } from "telegram-bot-framework"

export const SendMainMenu: CommandCallbackWithCtx = async (msg, match, botFramework: TGBotFramework) => {
  let bot = botFramework.bot
  // should send keyboard with buttons
  bot.sendMessage(msg.chat.id, "Ось меню зі основними функціями ⬇", {
    reply_markup: {
      keyboard: [[{ text: "🎓 Список спеціальностей" }, { text: "📄 Документи" }], [{ text: "🤝 Контакти" }]],
      resize_keyboard: true,
    },
  })
}
