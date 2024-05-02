import { MenuItem } from "./types"
import { IMenu } from "./types"

export class Menu implements IMenu {
  introText?: string
  items: MenuItem[]
  isMainMenu?: boolean
  _parentMenu?: IMenu

  // TODO: have constructor accept IMenu without _parentMenu
  constructor(menu: IMenu) {
    this.introText = menu.introText
    this.items = menu.items
    this.isMainMenu = menu.isMainMenu
    this._parentMenu = menu._parentMenu

    // if (this.parentMenu) {
    //   this.addBackButton()
    // }

    // if (!this.isMainMenu) {
    //   this.addHomeMenuButton()
    // }
  }

  /**
   * Adds submenu item to this menu and sets its parentMenu property. Also adds a home menu button to the submenu.
   */
  addSubmenuItem(item: MenuItem): void {
    let submenu = item.linksTo as Menu

    submenu._parentMenu = this

    let topMenu = this.getTopMenu()
    submenu.addHomeMenuButton(topMenu)

    this.items.push(item)
  }

  addBackButton() {
    this.items.unshift({
      caption: "Назад",
      linksTo: this._parentMenu,
    })
  }

  addHomeMenuButton(menu: IMenu) {
    // let topMenu = this.getTopMenu()

    this.items.push({
      caption: "<- До головного меню",
      linksTo: menu,
    })
  }

  getTopMenu(): IMenu {
    let topMenu: IMenu = this

    while (topMenu._parentMenu) {
      topMenu = topMenu._parentMenu
    }

    return topMenu
  }
}
