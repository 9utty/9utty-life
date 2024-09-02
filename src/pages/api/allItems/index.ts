/** @format */

import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const items = await client.blogItem.findMany()

  res.status(200).json(items)
}
