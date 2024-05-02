import dedent = require("dedent-js")
import { CommandCallbackWithCtx, InterviewFlow, TGBotFramework, TelegramCommand } from "telegram-bot-framework"
import { SendMainMenu } from "../SendMainMenu/SendMainMenu"
import { UserInfo } from "../../Database/UserInfoRepository/types/UserInfo"
import { UserInfoRepository } from "../../Database/UserInfoRepository/UserInfoRepository"

export const FillAboutMeCallback: CommandCallbackWithCtx = async (msg, match, botFramework: TGBotFramework) => {
  let userId = msg.from.id.toString()

  let firstName = msg.from.first_name
  let lastName = msg.from.last_name ?? ""
  let userHandle = msg.from.username ?? ""

  // date in format "12 March 2024"
  let nowString = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  let aboutMeDict: UserInfo = {
    name: "",
    specialty: "",
    email: "",

    TgUserHandle: userHandle,
    TgUserFirstName: firstName,
    TgUserLastName: lastName,

    TgUserId: userId,
    timestampString: nowString,
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
      aboutMeDict.name = r.text
    },

    validateResponse: async (r) => {
      let maxLen = 50
      if (r.text.length > maxLen) {
        await botFramework.bot.sendMessage(
          r.chat.id,
          `Ваше ім'я занадто довге. Максимальна довжина: ${maxLen} символів. Спробуйте ще раз.`
        )
        return false
      }
      return true
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
      Пошта: ${aboutMeDict.email}
      Handle користувача: ${aboutMeDict.TgUserHandle}
      Ім'я користувача: ${aboutMeDict.TgUserFirstName}
      Прізвище користувача: ${aboutMeDict.TgUserLastName}
      `
      await botFramework.bot.sendMessage(r.chat.id, aboutMeStr)

      await SendMainMenu(msg, match, botFramework)

      UserInfoRepository.saveOrUpdateUserInfo(aboutMeDict)
    },

    validateResponse: async (r) => {
      let hasAtSymbol = r.text.includes("@")
      if (!hasAtSymbol) {
        await botFramework.bot.sendMessage(r.chat.id, "Введіть коректну пошту. Спробуйте ще раз.")
        return false
      }
      return true
    },
  })

  return await interviewFlow.start(msg.chat.id)
}

export const FillAboutMeCommand: TelegramCommand = {
  regexp: "introduce_self",
  callback: FillAboutMeCallback,
  desc: "Запитати основні дані абітурієнта",
}
