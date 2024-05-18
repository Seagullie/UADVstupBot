import TelegramBot = require("node-telegram-bot-api")
import * as _ from "lodash"
import dedent = require("dedent-js")

// import { TGBot } from "../TelegramBot/TelegramBot"
import { LOCALE, TGBotFramework, TelegramCommand } from "telegram-bot-framework"
import { FillAboutMeCommand } from "./Commands/FillAboutMe/FillAboutMe"
import { StartCommand } from "./Commands/Start"
import { SendMainMenu, StackKeyboard, ArrayOfTextButtons } from "./Commands/SendMainMenu/SendMainMenu"
import { MenuItemCallback } from "./Models/types"
import { ALL_MENUS } from "./Menus/AllMenus"
import { Menu } from "./Models/Menu"

export class UADVstupBot extends TGBotFramework {
  // TODO: Refactor
  helpTextStart = ""
  helpTextEnd = dedent`
  ‣ help text end`

  readonly defaultLocale: LOCALE = LOCALE.ua

  /**
   * Maps chat id to the current menu that the user is in
   */
  currentMenuStorage: { [chatId: number]: Menu } = {}

  // override
  assignHandlers(bot: TelegramBot) {
    bot.on("polling_error", console.log)

    // твоя слеш команда тут:

    let sendMainMenuCommandParams: TelegramCommand = {
      regexp: "main_menu",
      callback: SendMainMenu,
      desc: "До головного меню",
      group: true,
      groupAndPrivate: true,
    }

    this.onCommand(sendMainMenuCommandParams)

    this.onCommand(FillAboutMeCommand)
    this.onCommand(StartCommand)
  }

  // override
  assignGeneralHandler(bot: TelegramBot) {
    bot.on("message", async (msg: TelegramBot.Message) => {
      console.log("message:", msg)

      // @ts-expect-error
      bot.setChatMenuButton(msg.chat.id, { type: "commands" })

      // execute callback for a message and return
      if (this.callbackStorage[msg.chat.id]) {
        this.callbackStorage[msg.chat.id](msg)
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

      // if (messageTextLowerCase === "🎓 список спеціальностей") {
      //   let listOfSpecialties = dedent`
      //   Список спеціальностей:
      //   ‣ Спеціальність 1
      //   ‣ Спеціальність 2
      //   ‣ Спеціальність 3
      //   `
      //   bot.sendMessage(msg.chat.id, listOfSpecialties)
      //   return
      // }

      if (messageTextLowerCase === "md") {
        let text = String.raw`https://vstup\.edbo\.gov\.ua/\ `
        bot.sendMessage(msg.chat.id, text, {
          parse_mode: "MarkdownV2",
        })
        return
      }

      let handled = await this.handleMenuButtonPress(messageTextLowerCase, msg)
      if (handled) return

      console.log("message text:", messageTextLowerCase)

      bot.sendMessage(msg.chat.id, "🤔🤔")
    })
  }

  /**
   * Goes over all menus and their items to check if any of them match the message text
   */
  async handleMenuButtonPress(messageTextLowerCase: string, msg: TelegramBot.Message) {
    let bot = this.bot

    let currentMenu = this.currentMenuStorage[msg.chat.id] ?? ALL_MENUS[0]

    // prioritize current menu for both not hitting navigation items in other menus and performance

    for (let menu of [currentMenu, ...ALL_MENUS]) {
      for (let menuItem of menu.items) {
        let captionLower = menuItem.caption.toLowerCase()
        if (messageTextLowerCase === captionLower) {
          let isItemLinkingToString = typeof menuItem.linksTo === "string"
          let isItemLinkingToFunction = typeof menuItem.linksTo === "function"

          if (isItemLinkingToString) {
            let content = menuItem.linksTo as string

            bot.sendMessage(msg.chat.id, content, {
              parse_mode: "MarkdownV2",
            })
            return true
          } else if (isItemLinkingToFunction) {
            let callback = menuItem.linksTo as MenuItemCallback

            await callback(this, msg)
            return true
          } else {
            // otherwise, it's a submenu that is being linked to
            let content = menuItem.linksTo as Menu

            this.sendMenu(msg.chat.id, content.introText ?? menuItem.caption, content)

            return true
          }
        }
      }
    }
  }

  /**
   * Sends a menu to a chat, also stores the menu in the currentMenuStorage
   */
  async sendMenu(chatId: number, text: string, menu: Menu) {
    let bot = this.bot

    // text = escapeSpecialTgChars(text)

    let arrOfTextBtns = ArrayOfTextButtons(menu.items.map((item) => item.caption))

    let kb = StackKeyboard(arrOfTextBtns)

    bot.sendMessage(chatId, text, {
      reply_markup: {
        keyboard: kb,
        resize_keyboard: true,
      },

      parse_mode: "MarkdownV2",
    })

    this.currentMenuStorage[chatId] = menu
  }
}
