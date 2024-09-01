/** @format */

import React from 'react'
import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogTitle,
  styled,
  TextField,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import Draggable from 'react-draggable'
import { Controller, useWatch } from 'react-hook-form'
import { ResizableBox } from 'react-resizable'
import useDialogForm from 'src/hooks/dialog/useDialogForm'
import useDialogHandle from 'src/hooks/dialog/useDialogHandle'
import LeftButton from 'src/common/left-button'
import RightButton from 'src/common/right-button'

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

export default function GuestBook() {
  const draggableRef = React.useRef(null)
  const form = useDialogForm()
  const { setValue, control, watch } = form
  const router = useRouter()
  const handle = useDialogHandle({ form })

  const open = useWatch({ control, name: 'open' })
  const position = useWatch({ control, name: 'position' })
  const size = watch('size')
  const isFocus = watch('isFocus')

  React.useEffect(() => {
    console.log(open)
    handle.handleOpen()
    const path = router
    console.log('path', router.query)
    if (path && typeof path === 'string') {
      setValue('path', path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('focus', isFocus)

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
                    minWidth: 45,
                    height: 35,
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  주소
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
                        이동
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
                height: size.height - 120 - 45 - 5
              }}
            >
              <StyledCardBox>hi</StyledCardBox>
            </Box>
          </Box>
        </ResizableBox>
      </StyledDialog>
    </Draggable>
  )
}
