import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filePath } = req.query
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

  // 특정 파일의 내용을 가져옴
  const fileResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    headers: {
      Accept: 'application/vnd.github.raw',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  if (!fileResponse.ok) {
    return res.status(fileResponse.status).json({ error: 'Failed to fetch file contents' })
  }

  const fileContent = await fileResponse.text()

  res.status(200).json({ content: fileContent })
}
