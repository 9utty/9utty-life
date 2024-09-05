/** @format */

import { Box, Typography } from '@mui/material'
import { MRT_ColumnDef, MRT_Row } from 'material-react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import DataGrid from 'src/common/dataGrid'
import { Item, PostByMainIdWithSubMenusAndItems, SubMenu } from 'src/types'

type Props = {
  mainMenuContent: PostByMainIdWithSubMenusAndItems
}

const imgList = ['/post.png', '/subMenu.png']

export default function MainContentComponent({ mainMenuContent }: Props) {
  const router = useRouter()

  const col = React.useMemo<MRT_ColumnDef<Item | SubMenu>[]>(
    () => [
      {
        id: 'name',
        header: '이름',
        Header: () => (
          <Typography variant='h6' color='#000'>
            이름
          </Typography>
        ),
        accessorFn: row => {
          if ('name' in row) {
            return `${row.name}`
          }

          return `${row.title}`
        },
        Cell: ({ row }: { row: MRT_Row<Item | SubMenu> }) => {
          if ('name' in row.original) {
            return (
              <Link href={`${router.asPath}/sub/${row.original.id}`}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    height: 40,
                    alignItems: 'center'
                  }}
                >
                  <Image
                    src={imgList[1]}
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
          } else {
            return (
              <Link href={`${router.asPath}/item/${row.original.id}`}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    height: 40,
                    alignItems: 'center'
                  }}
                >
                  <Image
                    src={imgList[0]}
                    alt={`${row.index}번째 이미지`}
                    width={35}
                    height={35}
                  />
                  <Typography variant='h6' color='#000'>
                    {row.original.title}
                  </Typography>
                </Box>
              </Link>
            )
          }
        }
      },
      {
        id: 'updateAt',
        header: '수정일',
        Header: () => (
          <Typography variant='h6' color='#000'>
            수정일
          </Typography>
        ),
        size: 100,
        Cell: ({ row }: { row: MRT_Row<Item | SubMenu> }) => {
          const updatedAt = new Date(row.original.updatedAt)
          if ('name' in row.original) {
            return (
              <Link href={`${router.asPath}/sub/${row.original.id}`}>
                <Typography variant='h6' color='#000'>
                  {updatedAt.toLocaleString('ko-KR', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                  })}
                </Typography>
              </Link>
            )
          } else {
            return (
              <Link href={`${router.asPath}/item/${row.original.id}`}>
                <Typography variant='h6' color='#000'>
                  {updatedAt.toLocaleString('ko-KR', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                  })}
                </Typography>
              </Link>
            )
          }
        }
      }
    ],
    [router.asPath]
  )

  const row: (Item | SubMenu)[] = [
    ...mainMenuContent.subMenus,
    ...mainMenuContent.blogItems
  ]

  return (
    <React.Fragment>
      <DataGrid<Item | SubMenu> col={col} row={row} />
    </React.Fragment>
  )
}
