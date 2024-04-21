import dedent = require("dedent-js")
import { CommandCallbackWithCtx, InterviewFlow, TGBotFramework, TelegramCommand } from "telegram-bot-framework"
import { SendMainMenu } from "./SendMainMenu"

type UserDesc = {
  name: string
  specialty: string
  email: string
}

export const FillAboutMeCallback: CommandCallbackWithCtx = async (msg, match, botFramework: TGBotFramework) => {
  let userId = msg.from.id.toString()
  let aboutMeDict: UserDesc = {
    name: "",
    specialty: "",
    email: "",
  }

  let aboutUserDict = {
    userId: userId,
    aboutMe: aboutMeDict,
  }

  await botFramework.bot.sendMessage(msg.chat.id, "Давайте знайомитись!")

  let interviewFlow = new InterviewFlow(botFramework.bot, botFramework.callbackStorage)

  // add questions

  interviewFlow.addQuestion({
    question: "Як вас звати? (ПІБ)",
    expectedResponses: undefined,
    showKb: true,
    onResponse: (r) => {
      let maxLen = 50

      // TODO: add validation logic to framework
      if (r.text.length > maxLen) {
        botFramework.bot.sendMessage(
          r.chat.id,
          `Ваше ім'я занадто довге. Максимальна довжина: ${maxLen} символів. Спробуйте ще раз.`
        )
        return
      }

      aboutMeDict.name = r.text
    },
  })

  interviewFlow.addQuestion({
    question: "На яку спеціальність плануєте вступати?",
    expectedResponses: undefined,
    showKb: true,
    onResponse: (r) => {
      aboutMeDict.specialty = r.text
    },
  })

  interviewFlow.addQuestion({
    question: "Залиште вашу пошту для зворотнього зв'язку.",
    expectedResponses: undefined,
    onResponse: async (r) => {
      aboutMeDict.email = r.text

      // this was the final question. Save the dict to db:
      botFramework.bot.sendMessage(r.chat.id, r.text + ". Дякуємо!")

      // echo the answers back to user
      let aboutMeStr = dedent`
      Ім'я: ${aboutMeDict.name}
      Спеціальність: ${aboutMeDict.specialty}
      Пошта: ${aboutMeDict.email}`
      await botFramework.bot.sendMessage(r.chat.id, aboutMeStr)

      await SendMainMenu(msg, match, botFramework)
    },
  })

  return await interviewFlow.start(msg.chat.id)
}

export const FillAboutMeCommand: TelegramCommand = {
  regexp: "introduce_self",
  callback: FillAboutMeCallback,
  desc: "Запитати основні дані абітурієнта",
}
