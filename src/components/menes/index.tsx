/** @format */

import { Box, CardContent, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DialogType } from 'src/types/enums/dialogEnum'

const WindowDialog = dynamic(() => import('src/common/windowDialog'), {
  ssr: false
})

export type Menu = {
  name: string
  img: string
  path: string
}

type Props = {
  children: React.ReactNode
}

export default function MenesComponent({ children }: Props) {
  const menus = React.useRef<Menu>({
    name: '방명록',
    img: '/write_yellow-1.png',
    path: '/guest-book'
  })

  return (
    <React.Fragment>
      <CardContent
        sx={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'start',
          gap: 4
        }}
      >
        <Box>
          <Link
            href={'/post'}
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('post')
              }
            }}
          >
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
                src={'/directory_open_file_mydocs-0.png'}
                alt={'포스트'}
                width={70}
                height={70}
                priority={true}
              />
              <Typography variant='body1' color='white'>
                포스트
              </Typography>
            </Box>
          </Link>
        </Box>
        <WindowDialog
          menu={menus.current}
          currentDialogType={DialogType.GUEST_BOOK}
        />
      </CardContent>
      {children}
    </React.Fragment>
  )
}
