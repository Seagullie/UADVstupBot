export interface IMenu {
  introText?: string
  items: MenuItem[]
  isMainMenu?: boolean
  _parentMenu?: IMenu
}
export interface MenuItem {
  caption: string
  /** Reference to child node of item */
  linksTo: IMenu | string
}
