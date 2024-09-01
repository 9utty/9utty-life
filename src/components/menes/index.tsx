/** @format */

import { Box, CardContent, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Menu = {
  name: string
  img: string
  path: string
}

const MENUS: Menu[] = [
  {
    name: '포스트',
    img: '/directory_open_file_mydocs-0.png',
    path: '/post'
  },
  {
    name: '방명록',
    img: '/write_yellow-1.png',
    path: '/guest-book'
  }
]

export default function MenesComponent() {
  return (
    <CardContent
      sx={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'start',
        gap: 4
      }}
    >
      {MENUS.map((menu, index) => (
        <Box key={index}>
          <Link href={menu.path}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 1,
                justifyContent: 'center'
              }}
            >
              <Image
                src={menu.img}
                alt={menu.name}
                width={70}
                height={70}
                priority={true}
              />
              <Typography variant='body1' color='white'>
                {menu.name}
              </Typography>
            </Box>
          </Link>
        </Box>
      ))}
    </CardContent>
  )
}
