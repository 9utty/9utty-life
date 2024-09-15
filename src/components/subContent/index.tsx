/** @format */

import { Box, Typography } from '@mui/material'
import { MRT_ColumnDef, MRT_Row } from 'material-react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import DataGrid from 'src/common/dataGrid'
import { Item, PostBySubMenuIdWithItems } from 'src/types'

type Props = {
  subMenuContent: PostBySubMenuIdWithItems
}

export default function SubContentComponent({ subMenuContent }: Props) {
  const router = useRouter()

  const col = React.useMemo<MRT_ColumnDef<Item>[]>(
    () => [
      {
        id: 'title',
        header: '이름',
        Header: () => (
          <Typography variant='h6' color='#000'>
            이름
          </Typography>
        ),
        size: 250,
        Cell: ({ row }: { row: MRT_Row<Item> }) => {
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
                  src='/post.png'
                  alt={`${row.index}번째 이미지`}
                  width={35}
                  height={35}
                />
                <Typography variant='h6' color='#000' noWrap>
                  {row.original.title}
                </Typography>
              </Box>
            </Link>
          )
        }
      },
      {
        id: 'updatedAt',
        header: '수정일',
        Header: () => (
          <Typography variant='h6' color='#000'>
            수정일
          </Typography>
        ),
        size: 100,
        Cell: ({ row }: { row: MRT_Row<Item> }) => {
          const updatedAt = new Date(row.original.updatedAt)

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
    ],
    [router.asPath]
  )

  return (
    <React.Fragment>
      <DataGrid<Item> col={col} row={subMenuContent.items} />
    </React.Fragment>
  )
}
