/** @format */

import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

const client = new PrismaClient()

function isNumeric(value: string): boolean {
  return /^\d+$/.test(value)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = process.env.GITHUB_REPO
  const token = process.env.GITHUB_TOKEN
  const { slug } = req.query

  if (!slug) {
    const mainMenus = await client.blogMainMenu.findMany()
    res.status(200).json(mainMenus)
  } else if (Array.isArray(slug)) {
    switch (slug.length) {
      case 2:
        if (slug[0] === 'main' && isNumeric(slug[1])) {
          // main/:mainId
          const mainDataById = await client.blogMainMenu.findMany({
            include: {
              subMenus: true,
              blogItems: true
            },
            where: {
              id: Number(slug[1])
            }
          })
          if (mainDataById) {
            res.status(200).json(mainDataById)
          } else {
            res.status(404).json({ error: 'MainMenu not found' })
          }
        } else {
          res
            .status(400)
            .json({ error: 'Invalid path or mainId is not a number' })
        }
        break
      case 4:
        if (
          slug[0] === 'main' &&
          slug[2] === 'sub' &&
          isNumeric(slug[1]) &&
          isNumeric(slug[3])
        ) {
          // main/:mainId/sub/:subId
          const subDataById = await client.blogSubMenu.findUnique({
            where: {
              id: Number(slug[3])
            }
          })
          const itemsBySubId = await client.blogItem.findMany({
            where: {
              subMenuId: Number(slug[3])
            }
          })
          if (subDataById) {
            res.status(200).json({
              subMenu: subDataById,
              items: itemsBySubId
            })
          } else {
            res.status(404).json({ error: 'SubMenu not found' })
          }
        } else if (
          slug[0] === 'main' &&
          slug[2] === 'item' &&
          isNumeric(slug[1]) &&
          isNumeric(slug[3])
        ) {
          // main/:mainId/item/:itemId
          const itemDataById = await client.blogItem.findUnique({
            where: {
              id: Number(slug[3])
            }
          })
          if (itemDataById) {
            client.blogItem.update({
              where: {
                id: Number(slug[3])
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

            if (fileContent === '404: Not Found') {
              return res.status(404).json({ error: 'Item not found' })
            }

            const result = await serialize(fileContent, {
              parseFrontmatter: true,
              mdxOptions: {
                rehypePlugins: [
                  rehypeHighlight,
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: 'wrap'
                    }
                  ]
                ]
              }
            })

            res.status(200).json({
              item: itemDataById,
              compiledSource: result
            })
          } else {
            res.status(404).json({ error: 'Item not found' })
          }
        } else {
          res.status(400).json({ error: 'Invalid path or IDs are not numbers' })
        }
        break
      case 6:
        if (
          slug[0] === 'main' &&
          slug[2] === 'sub' &&
          slug[4] === 'item' &&
          isNumeric(slug[1]) &&
          isNumeric(slug[3]) &&
          isNumeric(slug[5])
        ) {
          // main/:mainId/sub/:subId/item/:itemId

          const itemDataById = await client.blogItem.findUnique({
            where: {
              id: Number(slug[5])
            }
          })
          if (itemDataById) {
            client.blogItem.update({
              where: {
                id: Number(slug[5])
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

            if (fileContent === '404: Not Found') {
              return res.status(404).json({ error: 'Item not found' })
            }

            const result = await serialize(fileContent, {
              parseFrontmatter: true,
              mdxOptions: {
                rehypePlugins: [
                  rehypeHighlight,
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: 'wrap'
                    }
                  ]
                ]
              }
            })

            res.status(200).json({
              item: itemDataById,
              compiledSource: result
            })
          } else {
            res.status(404).json({ error: 'Item not found' })
          }
        } else {
          res.status(400).json({ error: 'Invalid path or IDs are not numbers' })
        }
        break
      default:
        res.status(400).json({ error: 'Invalid path length' })
    }
  } else {
    res.status(400).json({ error: 'Slug is not an array' })
  }
}
