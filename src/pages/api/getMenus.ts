/** @format */

import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

type SubMenu = {
  id: number
  mainMenuId: number
  name: string
  createdAt: Date
  updatedAt: Date
}

type BlogItem = {
  id: number
  mainMenuId: number | null
  subMenuId: number | null
  title: string
  content: string
  path: string
  viewCount: number
  tag: string
  createdAt: Date
  updatedAt: Date
}

type MainMenu = {
  id: number
  name: string
  subMenus: SubMenu[]
  blogItems: BlogItem[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const blogData = await client.blogMainMenu.findMany({
      include: {
        subMenus: true,
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
    })

    res.status(200).json({ blogData })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
