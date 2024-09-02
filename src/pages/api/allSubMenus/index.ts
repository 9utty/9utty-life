/** @format */

import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const subMenus = await client.blogSubMenu.findMany({
    include: {
      blogItems: true
    }
  })
  res.status(200).json(subMenus)
}
