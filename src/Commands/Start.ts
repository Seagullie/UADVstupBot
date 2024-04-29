import dedent = require("dedent-js")
import { CommandCallbackWithCtx, InterviewFlow, TGBotFramework, TelegramCommand } from "telegram-bot-framework"
import { FillAboutMeCallback } from "./FillAboutMe/FillAboutMe"
import { SendMainMenu } from "./SendMainMenu"

const Callback: CommandCallbackWithCtx = async (msg, match, botFramework: TGBotFramework) => {
  let introMessage = dedent`
    Привіт! Я бот, який допоможе вам вступити на бажану спеціальність. 🎓`

  await botFramework.bot.sendMessage(msg.chat.id, introMessage)

  await FillAboutMeCallback(msg, match, botFramework)
}

export const StartCommand: TelegramCommand = {
  regexp: "start",
  callback: Callback,
  desc: "Розпочати",
}
