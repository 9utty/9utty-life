/** @format */

import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const mainDataById = await client.blogMainMenu.findMany({
      include: {
        subMenus: true,
        blogItems: true
      }
    })

    res.status(200).json(mainDataById)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
