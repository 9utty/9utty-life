/** @format */

import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const repo = process.env.NEXT_PUBLIC_GITHUB_REPO
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
    const { id } = req.query

    const itemDataById = await client.blogItem.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (itemDataById) {
      client.blogItem.update({
        where: {
          id: Number(id)
        },
        data: {
          viewCount: itemDataById.viewCount + 1
        }
      })

      const fileResponse = await fetch(
        `https://api.github.com/repos/${repo}/contents/${itemDataById.path}`,
        {
          headers: {
            Accept: 'application/vnd.github.raw',
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      )

      if (!fileResponse.ok) {
        return res
          .status(fileResponse.status)
          .json({ error: 'Failed to fetch file contents' })
      }

      const fileContent = await fileResponse.text()

      res.status(200).json({ item: itemDataById, content: fileContent })
    } else {
      res.status(404).json({ error: 'Item not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
