import TelegramBot = require("node-telegram-bot-api")
import * as _ from "lodash"
import dedent = require("dedent-js")

// import { TGBot } from "../TelegramBot/TelegramBot"
import { TGBotFramework, TelegramCommand } from "telegram-bot-framework"
import { FillAboutMeCommand } from "./Commands/FillAboutMe/FillAboutMe"
import { StartCommand } from "./Commands/Start"
import { SendMainMenu, StackKeyboard, ArrayOfTextButtons } from "./Commands/SendMainMenu"
import { Menu } from "./Models/Menu"
import { ALL_MENUS } from "./Constants/Data/Menus/AllMenus"

export class UADVstupBot extends TGBotFramework {
  // TODO: Refactor
  helpTextStart = ""
  helpTextEnd = dedent`
  ‣ help text end`

  // override
  assignHandlers(bot: TelegramBot) {
    bot.on("polling_error", console.log)

    // твоя слеш команда тут:

    let sendMainMenuCommandParams: TelegramCommand = {
      regexp: "main_menu",
      callback: SendMainMenu,
      desc: "До головного меню",
    }

    this.onCommand(sendMainMenuCommandParams)

    this.onCommand(FillAboutMeCommand)
    this.onCommand(StartCommand)
  }

  // override
  assignGeneralHandler(bot: TelegramBot) {
    bot.on("message", (msg: TelegramBot.Message) => {
      console.log("message:", msg)

      // @ts-expect-error
      bot.setChatMenuButton(msg.chat.id, { type: "commands" })

      // execute callback for a message and return
      if (this.callbackStorage[msg.from.id]) {
        this.callbackStorage[msg.from.id](msg)
        return
      }

      // skip non-text messages
      if (typeof msg.text !== "string") {
        return
      }

      // skip commands
      if (msg.text.startsWith("/")) {
        return
      }

      let messageText: string = msg.text
      let messageTextLowerCase = messageText.toLowerCase()

      if (messageTextLowerCase === "🎓 список спеціальностей") {
        let listOfSpecialties = dedent`
        Список спеціальностей:
        ‣ Спеціальність 1
        ‣ Спеціальність 2
        ‣ Спеціальність 3
        `
        bot.sendMessage(msg.chat.id, listOfSpecialties)
        return
      }

      if (messageTextLowerCase === "📄 документи") {
        let documents = dedent`
        Документи:
        ‣ Документ 1
        ‣ Документ 2
        ‣ Документ 3
        `
        bot.sendMessage(msg.chat.id, documents)
        return
      }

      if (messageTextLowerCase === "🤝 контакти") {
        let contacts = dedent`
        Контакти:
        ‣ Телефон: 123456789
        ‣ Email: uad.vstup@gmail.com
        `
        bot.sendMessage(msg.chat.id, contacts)
        return
      }

      // go over all menus and their items to check if any of them match the message text
      ALL_MENUS.forEach((menu) => {
        menu.items.forEach((menuItem) => {
          let captionLower = menuItem.caption.toLowerCase()
          if (messageTextLowerCase === captionLower) {
            let isItemLinkingToString = typeof menuItem.linksTo === "string"

            if (isItemLinkingToString) {
              let content = menuItem.linksTo as string

              bot.sendMessage(msg.chat.id, content)
              return
            } else {
              // otherwise, it's a submenu that is being linked to
              let content = menuItem.linksTo as Menu
              let kb = StackKeyboard(ArrayOfTextButtons(content.items.map((item) => item.caption)))

              bot.sendMessage(msg.chat.id, menuItem.caption, {
                reply_markup: {
                  keyboard: kb,
                  resize_keyboard: true,
                },
              })
            }
          }
        })
      })

      console.log("message text:", messageTextLowerCase)

      bot.sendMessage(msg.chat.id, "Not recognized")
    })
  }
}
