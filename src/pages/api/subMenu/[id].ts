/** @format */

import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  try {
    const subDataById = await client.blogSubMenu.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        blogItems: true
      }
    })

    res.status(200).json(subDataById)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
