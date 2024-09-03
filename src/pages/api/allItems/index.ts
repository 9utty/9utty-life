/** @format */

import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Item, Items, ItemSummary } from 'src/types'

const client = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method

  if (method === 'GET') {
    const items: Items = await client.blogItem.findMany()
    const dto: ItemSummary[] = items.map(item => toDto(item))
    res.status(200).json(dto)
  }
}

function toDto(item: Item): ItemSummary {
  return {
    id: item.id,
    title: item.title,
    mainMenuId: item.mainMenuId,
    subMenuId: item.subMenuId,
    path: item.path
  }
}
