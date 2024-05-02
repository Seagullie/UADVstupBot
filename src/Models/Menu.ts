import { UADVstupBot } from "../UADVstupBot"
import { MenuItem, MenuParams } from "./types"
import { IMenu } from "./types"
import TelegramBot = require("node-telegram-bot-api")

export class Menu implements IMenu {
  introText?: string
  items: MenuItem[]
  isMainMenu?: boolean
  _parentMenu?: Menu

  // TODO: have constructor accept IMenu without _parentMenu
  constructor(menu: MenuParams) {
    this.introText = menu.introText
    this.items = menu.items
    this.isMainMenu = menu.isMainMenu

    // this._parentMenu = menu._parentMenu

    // if (this.parentMenu) {
    //   this.addBackButton()
    // }

    // if (!this.isMainMenu) {
    //   this.addHomeMenuButton()
    // }
  }

  addItem(item: MenuItem): void {
    this.items.push(item)
  }

  /**
   * Adds submenu item to this menu and sets its parentMenu property. Also adds a home menu button to the submenu.
   */
  addSubmenuItem(item: MenuItem): void {
    let submenu = item.linksTo as Menu

    submenu._parentMenu = this

    let topMenu = this.getTopMenu()
    submenu.addHomeMenuButton(topMenu)
    submenu.addBackButton()

    this.items.push(item)
  }

  addBackButton() {
    // no need to add back button to main menu, as this will be handled by .addHomeMenuButton()
    if (this._parentMenu.isMainMenu) return

    this.items.unshift({
      caption: "← Назад",
      linksTo: async (bot: UADVstupBot, msg: TelegramBot.Message) => {
        let parentMenu = this._parentMenu as Menu
        bot.sendMenu(msg.chat.id, "Назад", parentMenu)
      },
    })
  }

  addHomeMenuButton(menu: IMenu) {
    this.items.push({
      caption: "← До головного меню",
      linksTo: async (bot: UADVstupBot, msg: TelegramBot.Message) => {
        let mainMenu = this.getTopMenu()
        bot.sendMenu(msg.chat.id, "Головне меню", mainMenu)
      },
    })
  }

  getTopMenu(): Menu {
    let topMenu: Menu = this

    while (topMenu._parentMenu) {
      topMenu = topMenu._parentMenu
    }

    return topMenu
  }
}
