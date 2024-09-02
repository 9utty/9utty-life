/** @format */

import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  styled,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import Draggable from 'react-draggable'
import { Controller, useWatch } from 'react-hook-form'
import { ResizableBox } from 'react-resizable'
import useDialogForm from 'src/hooks/dialog/useDialogForm'
import useDialogHandle from 'src/hooks/dialog/useDialogHandle'
import { PostUrl, validationPostUrl } from 'src/utils/validationPostUrl'

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border: 3px solid #fff;
    border-right-color: #808080;
    border-bottom-color: #808080;
    border-left-color: #fff;
    border-top-color: #fff;
    box-shadow: none;
    margin: 0px;
  }
  ,
  .MuiDialog-root {
    height: 100%;
    width: 100%;
  }
  ,
  .MuiDialog-container {
    height: 100%;
    width: 100%;
  }
`

const StyledDialogTitle = styled(DialogTitle)`
  color: white;
  font-size: 14px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  border: 3px solid #fff;
  border-right-color: #808080;
  border-bottom-color: #808080;
  border-left-color: #fff;
  border-top-color: #fff;
  height: 45px;
`

const StyledButton = styled('div')`
  background-color: #c0c0c0;
  border: 3px solid #fff;
  border-right-color: #808080;
  border-bottom-color: #808080;
  border-left-color: #fff;
  border-top-color: #fff;
  color: black;
  font-size: 14px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: dunggeunmo-bold;
  &:active {
    border-right-color: #fff;
    border-bottom-color: #fff;
    border-left-color: #808080;
    border-top-color: #808080;
  }
  max-width: 100px;
  max-height: 30px;
`

const StyledMenuButton = styled(Button)`
  color: black;
  font-size: 14px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: dunggeunmo-bold;
  &:active {
    border: 3px solid #808080;
    border-right-color: #fff;
    border-bottom-color: #fff;
    border-left-color: #808080;
    border-top-color: #808080;
  }
  &:disabled {
    background-color: #c0c0c0;
    color: #808080;

    top: 1px;
    height: 68px;
  }
  width: 90px;
  height: 70px;
  flex-direction: column;
  border-radius: 0px;
`

const StyledSearchInput = styled('input')`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
  padding-left: 12px;
  padding-right: 12px;
  color: #000;
  font-family: dunggeunmo-bold;
  border: 2px solid #808080;
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #fff;
  border-right-color: #fff;
  outline: none;
`

const StyledCardBox = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: #c0c0c0;
  padding-left: 12px;
  padding-right: 12px;
  border: 3px solid #808080;
  border-right-color: #fff;
  border-bottom-color: #fff;
  border-left-color: #808080;
  border-top-color: #808080;
`

export type MainMenu = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  blogItems: Items[]
  subMenus: SubMenu[]
}

export type SubMenu = {
  id: number
  mainMenuId: number
  name: string
  createdAt: Date
  updatedAt: Date
  blogItems: Items[]
}

export type Items = {
  id: number
  mainMenuId: number | null
  subMenuId: number | null
  title: string
  path: string
  viewCount: number
  tag: string[]
  createdAt: Date
  updatedAt: Date
}

export default function PostComponent({
  mainMenus,
  items,
  slug
}: {
  mainMenus: MainMenu[]
  items: Items[]
  slug: string[]
}) {
  const [postUrl, setPostUrl] = React.useState<PostUrl>({
    mainMenu: '',
    mainMenuId: '',
    subMenu: '',
    subMenuId: '',
    item: '',
    itemId: ''
  })
  const draggableRef = React.useRef(null)
  const form = useDialogForm()
  const { setValue, control, watch } = form
  const handle = useDialogHandle({ form, items })

  const open = useWatch({ control, name: 'open' })
  const position = useWatch({ control, name: 'position' })
  const size = watch('size')
  const isFocus = watch('isFocus')

  React.useEffect(() => {
    handle.handleOpen()
    const postUrl = validationPostUrl(slug)
    if (postUrl) {
      setPostUrl(postUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Draggable
      handle='.MuiDialogTitle-root'
      ref={draggableRef}
      onMouseDown={() => handle.handleFocus()}
      onStart={() => handle.handleDragStart()}
      onStop={() => handle.handleDragStop()}
    >
      <StyledDialog
        ref={draggableRef}
        open={open}
        fullScreen={true}
        maxWidth='lg'
        sx={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          width: size.width,
          height: size.height,
          m: 0,
          zIndex: isFocus ? 1001 : 1000,
          '.MuiPaper-root': {
            width: size.width,
            height: size.height
          }
        }}
        hideBackdrop={true}
        onBlur={() => handle.handleBlur()}
        onClick={() => handle.handleFocus()}
        tabIndex={-1}
      >
        <ResizableBox
          width={size.width}
          height={size.height}
          minConstraints={[200, 200]}
          maxConstraints={[1000, 800]}
          onResizeStart={() => handle.handleResizeStart()}
          onResizeStop={() => handle.handleResizeStop()}
          onResize={(e, data) => handle.handleResize(data)}
          style={{
            marginRight: 5
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              maxHeight: 900,
              overflowY: 'scroll'
            }}
          >
            <StyledDialogTitle
              sx={{
                backgroundColor: isFocus ? '#000080' : '#c6c6c6', // Change background color based on zIndex
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: size.width - 5
              }}
            >
              <Typography>게시글 페이지</Typography>

              <StyledButton onClick={() => handle.handleClose()}>
                X
              </StyledButton>
            </StyledDialogTitle>
            <Box
              sx={{
                height: 110,
                width: size.width - 6,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  height: 70,
                  display: 'flex',
                  border: '1px solid #808080',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', minWidth: 160 }}>
                  <StyledMenuButton onClick={() => handle.handleClose()}>
                    <Typography>{'< 뒤로'} </Typography>
                  </StyledMenuButton>
                  <StyledMenuButton
                    onClick={() => handle.handleClose()}
                    disabled={true}
                  >
                    <Typography>{'앞으로 >'} </Typography>
                  </StyledMenuButton>
                </Box>
                <Box>
                  <Typography>검색하기</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 0.5,
                  height: 35,

                  border: '1px solid #808080'
                }}
              >
                <Typography
                  sx={{
                    minWidth: 65,
                    height: 35,
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  검색어
                </Typography>
                <Controller
                  control={control}
                  name='searchText'
                  render={({ field }) => (
                    <React.Fragment>
                      <StyledSearchInput
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      />
                      <StyledButton
                        style={{
                          width: 70,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => handle.handleSearch(field.value)}
                      >
                        검색
                      </StyledButton>
                    </React.Fragment>
                  )}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                pl: 1,
                pr: 1.5,
                pt: 1,
                pb: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: size.height - 110 - 45 - 5
              }}
            >
              <StyledCardBox>
                {mainMenus.map(item => (
                  <Box key={item.id}>
                    <Typography>{item.name}</Typography>
                  </Box>
                ))}
              </StyledCardBox>
            </Box>
          </Box>
        </ResizableBox>
      </StyledDialog>
    </Draggable>
  )
}

export async function getServerSideProps(context: any) {
  const getAllMainMenus = async () => {
    const baseUrl = `${process.env.MY_URL}api`
    const res = await fetch(`${baseUrl}/allMainMenus`, {
      next: { revalidate: 1000 }
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()
    let items: Items[] = []
    data.forEach((item: MainMenu) => {
      console.log(item)
      if (item.subMenus) {
        item.subMenus.forEach(subMenu => {
          if (subMenu.blogItems) {
            items = [...items, ...subMenu.blogItems]
          }
        })
      }
      if (item.blogItems) {
        items = [...items, ...item.blogItems]
      }
    })

    return {
      mainMenus: data,
      items
    }
  }

  const data = await getAllMainMenus()

  const slug = context.query.slug

  return {
    props: {
      mainMenus: data.mainMenus,
      items: data.items,
      slug: slug ?? []
    }
  }
}
