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
import Draggable from 'react-draggable'
import {
  Controller,
  FormProvider,
  useFormContext,
  useWatch
} from 'react-hook-form'
import { ResizableBox } from 'react-resizable'
import useDialogForm from 'src/hooks/dialog/useDialogForm'
import useDialogHandle from 'src/hooks/dialog/useDialogHandle'
import { NextPageContext } from 'next'
import { ItemSummary, MainMenus, PostPageProps } from 'src/types'
import BlogMainMenusComponent from 'src/components/main'
import MainContentComponent from 'src/components/mainContent'
import SubContentComponent from 'src/components/subContent'
import ItemComponent from 'src/components/item'
import Image from 'next/image'
import { DialogFormDefaultValuesType } from 'src/pages/_app'
import { DialogType } from 'src/types/enums/dialogEnum'
import { useRouter } from 'next/router'

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
  font-size: 18px;
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
  background-color: fff;
  border: 3px solid #808080;
  border-right-color: #fff;
  border-bottom-color: #fff;
  border-left-color: #808080;
  border-top-color: #808080;
`

export default function PostComponent({
  summaryItems,
  mainMenus,
  subMenuContent,
  mainMenuContent,
  item,
  type
}: PostPageProps) {
  const { watch: dialogWatch } = useFormContext<DialogFormDefaultValuesType>()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const draggableRef = React.useRef(null)
  const form = useDialogForm()
  const { control, watch } = form
  const handle = useDialogHandle({ form, items: summaryItems })

  const open = useWatch({ control, name: 'open' })
  const position = useWatch({ control, name: 'position' })
  const size = watch('size')
  const dialogType = dialogWatch('type')
  const router = useRouter()

  React.useEffect(() => {
    handle.handleOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Draggable
      handle='.MuiDialogTitle-root'
      ref={draggableRef}
      onMouseDown={() => {
        handle.handleFocus()
      }}
      onStart={() => handle.handleDragStart()}
      onStop={handle.handleDragStop}
    >
      <StyledDialog
        ref={draggableRef}
        open={open}
        fullScreen={true}
        maxWidth='lg'
        id='post-dialog'
        sx={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          width: size.width,
          height: size.height,
          m: 0,
          zIndex: dialogType === DialogType.POST ? 1001 : 1000,
          '.MuiPaper-root': {
            width: size.width,
            height: size.height
          }
        }}
        hideBackdrop={true}
        onClick={() => handle.handleFocus()}
        tabIndex={1}
      >
        <ResizableBox
          width={size.width}
          height={size.height}
          minConstraints={[200, 200]}
          maxConstraints={[1800, 1000]}
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
                backgroundColor:
                  dialogType === DialogType.POST ? '#000080' : '#c6c6c6', // Change background color based on zIndex
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: size.width - 5
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Image
                  src={'/directory_open_file_mydocs-0.png'}
                  alt={'포스트'}
                  width={25}
                  height={25}
                  priority={true}
                />
                <Typography>게시글 페이지</Typography>
              </Box>
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
                  <StyledMenuButton
                    onClick={() => {
                      if (
                        typeof window !== 'undefined' &&
                        window.history.length > 0
                      ) {
                        router.back()
                      }
                    }}
                  >
                    <Typography>{'< 뒤로'} </Typography>
                  </StyledMenuButton>
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
                        ref={inputRef}
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                        onClick={() => inputRef.current?.focus()}
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
                <FormProvider {...form}>
                  {type === 'mainMenus' && (
                    <BlogMainMenusComponent mainMenus={mainMenus} />
                  )}
                  {type === 'mainMenuContent' &&
                    mainMenuContent &&
                    mainMenuContent.at(0) && (
                      <MainContentComponent
                        mainMenuContent={mainMenuContent[0]}
                      />
                    )}
                  {type === 'subMenuContent' && subMenuContent && (
                    <SubContentComponent subMenuContent={subMenuContent} />
                  )}
                  {type === 'item' && item && <ItemComponent item={item} />}
                </FormProvider>
              </StyledCardBox>
            </Box>
          </Box>
        </ResizableBox>
      </StyledDialog>
    </Draggable>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  function isNumeric(value: string): boolean {
    return /^\d+$/.test(value)
  }

  const revalidateData = 1200

  const { slug } = context.query
  const baseUrl = `${process.env.MY_URL}api`
  const itemsRes = await fetch(`${baseUrl}/allItems`, {
    method: 'GET',
    next: { revalidate: revalidateData }
  })
  const summaryItems: ItemSummary[] = await itemsRes.json()

  if (slug === undefined) {
    const mainMenusRes = await fetch(`${baseUrl}/post`, {
      method: 'GET',
      next: { revalidate: revalidateData }
    })

    const mainMenus: MainMenus = await mainMenusRes.json()
    if (mainMenusRes.ok) {
      return {
        props: {
          summaryItems,
          mainMenus,
          type: 'mainMenus'
        }
      }
    } else {
      return {
        notFound: true
      }
    }
  } else {
    switch (slug.length) {
      case 2:
        if (slug[0] === 'main' && isNumeric(slug[1])) {
          const mainMenuContentRes = await fetch(
            `${baseUrl}/post/main/${slug[1]}`,
            { method: 'GET', next: { revalidate: revalidateData } }
          )
          if (mainMenuContentRes.ok) {
            const mainMenuContent = await mainMenuContentRes.json()

            return {
              props: {
                summaryItems,
                mainMenus: [],
                mainMenuContent,
                type: 'mainMenuContent'
              }
            }
          } else {
            return {
              notFound: true
            }
          }
        }
        break
      case 4:
        if (
          slug[0] === 'main' &&
          slug[2] === 'sub' &&
          isNumeric(slug[1]) &&
          isNumeric(slug[3])
        ) {
          const subMenuContentRes = await fetch(
            `${baseUrl}/post/main/${slug[1]}/sub/${slug[3]}`,
            { method: 'GET', next: { revalidate: revalidateData } }
          )
          const subMenuContent = await subMenuContentRes.json()
          if (subMenuContentRes.ok) {
            return {
              props: {
                summaryItems,
                mainMenus: [],
                subMenuContent,
                type: 'subMenuContent'
              }
            }
          } else {
            return {
              notFound: true
            }
          }
        } else if (
          slug[0] === 'main' &&
          slug[2] === 'item' &&
          isNumeric(slug[1]) &&
          isNumeric(slug[3])
        ) {
          const itemContentRes = await fetch(
            `${baseUrl}/post/main/${slug[1]}/item/${slug[3]}`,
            { method: 'GET', next: { revalidate: revalidateData } }
          )
          const item = await itemContentRes.json()
          if (itemContentRes.ok) {
            return {
              props: {
                summaryItems,
                mainMenus: [],
                item,
                type: 'item'
              }
            }
          } else {
            return {
              notFound: true
            }
          }
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
          const itemContentRes = await fetch(
            `${baseUrl}/post/main/${slug[1]}/sub/${slug[3]}/item/${slug[5]}`,
            { method: 'GET', next: { revalidate: revalidateData } }
          )
          const item = await itemContentRes.json()
          if (itemContentRes.ok) {
            return {
              props: {
                summaryItems,
                mainMenus: [],
                item,
                type: 'item'
              }
            }
          } else {
            return {
              notFound: true
            }
          }
        } else {
          return {
            notFound: true
          }
        }
        break
      default:
        return {
          notFound: true
        }
    }
  }

  return {
    props: {
      summaryItems,
      mainMenus: [],
      type: 'mainMenus'
    }
  }
}
