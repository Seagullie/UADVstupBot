import { TgBotParams } from "telegram-bot-framework"
import { HANDLE, TOKEN } from "./Constants/Constants"
import { UADVstupBot } from "./UADVstupBot"

let botParams: TgBotParams = {
  handle: HANDLE,
  token: TOKEN,
  whitelist: [],
  dbs: [],
}
let tgBot = new UADVstupBot(botParams)
