import TelegramBot = require("node-telegram-bot-api")
import * as _ from "lodash"
import dedent = require("dedent-js")

// import { TGBot } from "../TelegramBot/TelegramBot"
import { MONGO_CLIENT, COLLECTION_NAME, DB_NAME } from "./Database/mongoDBClient"
import { TGBotFramework, TelegramCommand } from "telegram-bot-framework"
import { FillAboutMeCommand } from "./Commands/FillAboutMe"
import { StartCommand } from "./Commands/Start"
import { SendMainMenu } from "./Commands/SendMainMenu"

export class UADVstupBot extends TGBotFramework {
  // TODO: Refactor
  helpTextStart = ""
  helpTextEnd = dedent`
  ‣ help text end`

  // override
  // @ts-expect-error
  assignHandlers(bot: TelegramBot) {
    bot.on("polling_error", console.log)

    // let commandParams: TelegramCommand = {
    //   regexp: "test",
    //   callback: (msg) => bot.sendMessage(msg.chat.id, "response"),
    //   desc: ":flask:",
    //   groupAndPrivate: true,
    // }
    // this.onCommand(commandParams)

    // let channelId = -1002112513305

    // const postToChannelCommandParams: TelegramCommand = {
    //   regexp: "post_to_channel",
    //   callback: (msg) => bot.sendMessage(channelId, "this message was published by a bot"),
    //   desc: "sends message to specified channel",
    //   groupAndPrivate: true,
    // }

    // this.onCommand(postToChannelCommandParams)

    // const pingDbCommandParams: TelegramCommand = {
    //   regexp: "ping_db",
    //   desc: "pings a db to test whether it's working",
    //   callback: async (msg) => {
    //     // Connect the client to the server (optional starting in v4.7)
    //     await MONGO_CLIENT.connect()
    //     // Send a ping to confirm a successful connection
    //     await MONGO_CLIENT.db("admin").command({ ping: 1 })
    //     console.log("Pinged your deployment. You successfully connected to MongoDB!")

    //     // Access the database and collection
    //     const database = MONGO_CLIENT.db(DB_NAME)
    //     const collection = database.collection(COLLECTION_NAME)

    //     // Query the collection and read data
    //     const document = await collection.findOne({})

    //     // Log the retrieved documents
    //     console.log("Retrieved documents:", document)

    //     bot.sendMessage(msg.chat.id, "successfully pinged a db and retrieved a document: " + JSON.stringify(document))
    //   },
    //   groupAndPrivate: true,
    // }

    // this.onCommand(pingDbCommandParams)

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
  // @ts-expect-error
  assignGeneralHandler(bot: TelegramBot) {
    bot.on("message", (msg: TelegramBot.Message) => {
      console.log("message:", msg)

      // @ts-expect-error
      bot.setChatMenuButton(msg.chat.id, { type: "commands" })

      // execute callback for a message and return
      if (this.callbackStorage[msg.from.id]) {
        // @ts-expect-error
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

      console.log("message text:", messageTextLowerCase)

      bot.sendMessage(msg.chat.id, "Not recognized")
    })
  }
}
