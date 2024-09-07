/** @format */
import 'highlight.js/styles/github-dark.css'
import {
  Box,
  CardContent,
  Divider,
  Grid,
  Typography,
  useMediaQuery
} from '@mui/material'
import { MDXRemote } from 'next-mdx-remote'
import React from 'react'
import { PostByItemId } from 'src/types'
import Utterances from '../utterances/utterances'
import Image from 'next/image'

type Props = {
  item: PostByItemId
}

export default function ItemComponent({ item }: Props) {
  const isMobile = useMediaQuery('(max-width: 500px)')
  const createdAt = new Date(item.item.createdAt)
  const formattedDate = createdAt.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        px: 5,
        color: '#000',
        paddingX: isMobile ? 2 : 10
      }}
    >
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: '100%'
            }}
          >
            <Image
              src={'/post.png'}
              alt={item.item.title}
              width={isMobile ? 40 : 80}
              height={isMobile ? 40 : 80}
            />
            <Typography variant={isMobile ? 'h5' : 'h3'} color='#000'>
              {item.item.title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: '100%',
              mt: 10,
              justifyContent: 'space-between'
            }}
          >
            <Typography variant={isMobile ? 'body1' : 'h5'} color='#000'>
              {`tag: [${item.item.tag.toString()}]`}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'end',
                gap: 2,
                justifyContent: 'end',
                flexDirection: 'column'
              }}
            >
              <Typography variant={isMobile ? 'body1' : 'h5'} color='#000'>
                {`${item.item.viewCount} views`}
              </Typography>
              <Typography variant={isMobile ? 'body1' : 'h5'} color='#000'>
                {`업데이트: ${formattedDate}`}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider
            sx={{
              borderColor: '#000',
              borderWidth: isMobile ? '1px' : '1.5px'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <article>
            <MDXRemote {...item.compiledSource} />
          </article>
        </Grid>
        <Grid item xs={12}>
          <Divider
            sx={{
              borderColor: '#000',
              borderWidth: isMobile ? '0.5px' : '1.5px'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' color='#000'>
            개인 블로그입니다!
          </Typography>
          <Typography variant='h6' color='#000'>
            잘못된 내용이 있다면 꼭 알려주세요!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider
            sx={{
              borderColor: '#000',
              borderWidth: isMobile ? '0.5px' : '1.5px'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Utterances />
        </Grid>
      </Grid>
    </CardContent>
  )
}
