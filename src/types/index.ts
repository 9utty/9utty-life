/** @format */

import { MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'

export type MainMenu = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type SubMenu = {
  id: number
  mainMenuId: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type Item = {
  id: number
  mainMenuId: number | null
  subMenuId: number | null
  title: string
  path: string
  viewCount: number
  tag: string
  createdAt: Date
  updatedAt: Date
}

export type ItemSummary = {
  id: number
  title: string
  mainMenuId: number | null
  subMenuId: number | null
  path: string
}

export type Items = Item[]
export type MainMenus = MainMenu[]
export type SubMenus = SubMenu[]

export type PostMainGet = MainMenus
export type PostByMainIdWithSubMenusAndItems = {
  mainMenu: MainMenu
  subMenus: SubMenus
  blogItems: Items
}
export type PostBySubMenuIdWithItems = {
  subMenu: SubMenu
  items: Items
}
export type PostByItemId = {
  item: Item
  compiledSource: MDXRemoteSerializeResult
}

export type PostPageProps = {
  absoluteUrl: string
  summaryItems: ItemSummary[]
  mainMenus: PostMainGet
  subMenuContent: PostBySubMenuIdWithItems | undefined
  mainMenuContent: PostByMainIdWithSubMenusAndItems[] | undefined
  item: PostByItemId | undefined
  type: 'mainMenus' | 'mainMenuContent' | 'subMenuContent' | 'item'
}
