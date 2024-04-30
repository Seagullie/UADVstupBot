export interface Menu {
  introText?: string
  items: MenuItem[]
  isMainMenu?: boolean
  parentMenu?: Menu
}

export interface MenuItem {
  caption: string
  /** Reference to child node of item */
  linksTo: Menu | string
}
