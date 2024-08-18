/** @format */

import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const mainMenuList = await client.blogMainMenu.findMany()
    console.log(mainMenuList)

    res.status(200).json(mainMenuList)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
