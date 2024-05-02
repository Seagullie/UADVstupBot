import TelegramBot = require("node-telegram-bot-api")
import { UADVstupBot } from "../UADVstupBot"
export interface IMenu {
  introText?: string
  items: MenuItem[]
  isMainMenu?: boolean
  _parentMenu?: IMenu
}

export type MenuItemCallback = (botFramework: UADVstupBot, msg: TelegramBot.Message) => Promise<void>

export interface MenuItem {
  caption: string
  /** Reference to child node of item */
  linksTo: IMenu | string | MenuItemCallback
}

export type MenuParams = {
  introText?: string
  items: MenuItem[]
  isMainMenu?: boolean
}
