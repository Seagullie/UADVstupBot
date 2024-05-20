import dedent = require("dedent-js")
import { CommandCallbackWithCtx, InterviewFlow, TGBotFramework, TelegramCommand } from "telegram-bot-framework"

const Callback: CommandCallbackWithCtx = async (msg, match, botFramework: TGBotFramework) => {
  let linkToChat = "https://t.me/+vkUxLxxds_Y3MmEy"
  let chatLinkMessage = dedent`
    Ось чат для абітурієнтів, де можна отримати консультації від справжнісіньких людей:
    
    [Перейти](${linkToChat})`

  await botFramework.bot.sendMessage(msg.chat.id, chatLinkMessage, { parse_mode: "MarkdownV2" })
}

export const GetAbitChatLinkCommand: TelegramCommand = {
  regexp: "chat",
  callback: Callback,
  desc: "Чат для абітурієнтів",
  group: true,
  groupAndPrivate: true,
}
