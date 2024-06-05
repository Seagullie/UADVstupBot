import dedent = require("dedent-js")
import { CommandCallbackWithCtx, InterviewFlow, TGBotFramework, TelegramCommand } from "telegram-bot-framework"
import { SendMainMenu } from "../SendMainMenu/SendMainMenu"
import { UserInfo } from "../../Database/UserInfoRepository/types/UserInfo"
import { UserInfoRepository } from "../../Database/UserInfoRepository/UserInfoRepository"
import { escapeSpecialTgChars } from "../../Utilities/Utilities"
import { TELEGRAM_REPORTING_CHANNEL_ID } from "../../Constants/Constants"
import TelegramBot = require("node-telegram-bot-api")
import { INTRO_VIDEO_ID } from "../../Constants/Secrets"

/**
 * Sends an intro video to the user. If the video is not found, sends a local video file.
 */
async function sendIntroVideo(msg: TelegramBot.Message, botFramework: TGBotFramework) {
  let caption = "Загальний опис бота у цьому короткому відео."

  try {
    let videoId = INTRO_VIDEO_ID

    return botFramework.bot.sendVideo(msg.chat.id, videoId, { caption: caption })
  } catch (err) {
    console.error(err)

    let pathToVideo = "media/video/bot_intro.mp4"
    return botFramework.bot.sendVideo(
      msg.chat.id,
      pathToVideo,
      {
        caption: caption,
        thumbnail: pathToVideo,
      },
      {
        contentType: "video/mp4",
        filename: "bot_intro.mp4",
      }
    )
  }
}

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

  // final question
  // TODO: add onFinished callback to InterviewFlow
  interviewFlow.addQuestion({
    question: "Залиште вашу пошту для зворотнього зв'язку.",
    expectedResponses: undefined,
    onResponse: async (r) => {
      aboutMeDict.email = r.text

      // this was the final question. Save the dict to db:

      let aboutMeDictEscaped = { ...aboutMeDict }
      aboutMeDictEscaped.name = escapeSpecialTgChars(aboutMeDict.name)
      aboutMeDictEscaped.specialty = escapeSpecialTgChars(aboutMeDict.specialty)
      aboutMeDictEscaped.email = escapeSpecialTgChars(aboutMeDict.email)
      aboutMeDictEscaped.TgUserHandle = escapeSpecialTgChars(aboutMeDict.TgUserHandle)
      aboutMeDictEscaped.TgUserFirstName = escapeSpecialTgChars(aboutMeDict.TgUserFirstName)
      aboutMeDictEscaped.TgUserLastName = escapeSpecialTgChars(aboutMeDict.TgUserLastName)

      let aboutMeStr = dedent`

      Абітурієнт залишив наступну інформацію:

      >Особиста інформація

      *Ім'я*: ${aboutMeDictEscaped.name}
      *Спеціальність*: ${aboutMeDictEscaped.specialty}
      *Пошта*: ${aboutMeDictEscaped.email}

      >Телеграм інфо

      *Handle користувача*: @${aboutMeDictEscaped.TgUserHandle}
      *Ім'я користувача*: ${aboutMeDictEscaped.TgUserFirstName}
      *Прізвище користувача*: ${aboutMeDictEscaped.TgUserLastName == "" ? "\\-" : aboutMeDict.TgUserLastName}
      [*Користувач*](tg://user?id=${aboutMeDictEscaped.TgUserId})
      `

      let thankYouMessage = `Дякуємо за відповіді, ${aboutMeDict.TgUserFirstName}!`
      await botFramework.bot.sendMessage(r.chat.id, thankYouMessage)

      // send intro video
      try {
        await sendIntroVideo(r, botFramework)
      } catch (err) {
        console.error(err)
      }

      await SendMainMenu(msg, match, botFramework)

      UserInfoRepository.saveOrUpdateUserInfo(aboutMeDict)

      // send this data to a channel
      let channelId = TELEGRAM_REPORTING_CHANNEL_ID
      let channelMsg = await botFramework.bot.sendMessage(channelId, aboutMeStr, {
        parse_mode: "MarkdownV2",
      })
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
  group: false,
}
