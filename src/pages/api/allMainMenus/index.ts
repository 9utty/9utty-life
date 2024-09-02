/** @format */

import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

export type MainMenu = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  subMenus: SubMenu[]
  blogItems: Items[]
}

export type SubMenu = {
  id: number
  mainMenuId: number
  name: string
  createdAt: Date
  updatedAt: Date
  blogItems: Items[]
}

export type Items = {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mainMenus: MainMenu[] = await client.blogMainMenu.findMany({
    include: {
      blogItems: true,
      subMenus: {
        select: {
          id: true,
          mainMenuId: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          blogItems: {
            select: {
              id: true,
              mainMenuId: true,
              subMenuId: true,
              title: true,
              path: true,
              viewCount: true,
              tag: true,
              createdAt: true,
              updatedAt: true
            }
          }
        }
      }
    }
  })

  const uniqueBlogItems = new Set<number>()
  mainMenus.forEach(mainMenu => {
    mainMenu.blogItems = mainMenu.blogItems.filter(item => {
      if (uniqueBlogItems.has(item.id)) {
        return false
      } else {
        uniqueBlogItems.add(item.id)

        return true
      }
    })

    mainMenu.subMenus.forEach(subMenu => {
      subMenu.blogItems = subMenu.blogItems.filter(item => {
        if (uniqueBlogItems.has(item.id)) {
          return false
        } else {
          uniqueBlogItems.add(item.id)

          return true
        }
      })
    })
  })

  res.status(200).json(mainMenus)
}
