/** @format */

import { Box, Typography } from '@mui/material'
import React from 'react'
import { MainMenu, MainMenus } from 'src/types'
import { MRT_ColumnDef, MRT_Row } from 'material-react-table'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import DataGrid from 'src/common/dataGrid'

type Props = {
  mainMenus: MainMenus
}

const imgList: Record<string, string> = {
  Network: '/main1.png',
  '42서울': '/main2.png',
  Project: '/main3.png',
  Frontend: '/main4.png'
}

export default function BlogMainMenusComponent({ mainMenus }: Props) {
  const router = useRouter()

  const col = React.useMemo<MRT_ColumnDef<MainMenu>[]>(
    () => [
      {
        id: 'name',
        header: '이름',
        Header: () => (
          <Typography variant='h6' color='#000'>
            이름
          </Typography>
        ),
        Cell: ({ row }: { row: MRT_Row<MainMenu> }) => {
          const img = imgList[row.original.name]

          if (!img) return null

          return (
            <Link href={`${router.asPath}/main/${row.original.id}`}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  height: 40,
                  alignItems: 'center'
                }}
              >
                <Image
                  src={img}
                  alt={`${row.index}번째 이미지`}
                  width={35}
                  height={35}
                />
                <Typography variant='h6' color='#000'>
                  {row.original.name}
                </Typography>
              </Box>
            </Link>
          )
        }
      },
      {
        id: 'createdAt',
        header: '생성일',
        Header: () => (
          <Typography variant='h6' color='#000'>
            생성일
          </Typography>
        ),
        Cell: ({ row }: { row: MRT_Row<MainMenu> }) => {
          const createdAt = new Date(row.original.createdAt)

          return (
            <Link href={`${router.asPath}/main/${row.original.id}`}>
              <Typography variant='h6' color='#000'>
                {createdAt.toLocaleString('ko-KR', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric'
                })}
              </Typography>
            </Link>
          )
        }
      }
    ],
    [router.asPath]
  )

  return (
    <React.Fragment>
      <DataGrid<MainMenu> col={col} row={mainMenus} />
    </React.Fragment>
  )
}
