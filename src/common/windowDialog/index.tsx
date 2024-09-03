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
import { useWatch } from 'react-hook-form'
import { ResizableBox } from 'react-resizable'
import useWindowDialogForm from 'src/common/windowDialog/hooks/useWindowDialogForm'
import useWindowDialogHandle from 'src/common/windowDialog/hooks/useWindowDialogHandle'
import { Menu } from 'src/components/menes'
import Image from 'next/image'

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

interface WindowDialogProps {
  menu: Menu
}

export default function WindowDialogComponent({ menu }: WindowDialogProps) {
  const draggableRef = React.useRef(null)
  const form = useWindowDialogForm()
  const { control, watch } = form
  const handle = useWindowDialogHandle({ form })

  const position = useWatch({ control, name: 'position' })
  const size = watch('size')
  const isFocus = watch('isFocus')
  const open = watch('open')

  return (
    <React.Fragment>
      <Button onClick={() => handle.handleOpen()}>
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
      </Button>
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
          id={`${menu.name}-dialog`}
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
          onClick={() => handle.handleFocus()}
          onBlur={e => {
            if (e.currentTarget) {
              handle.handleBlur()
            }
          }}
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
                <Typography>{menu.name}</Typography>

                <StyledButton
                  onClick={() => {
                    handle.handleClose()
                  }}
                >
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
                <StyledCardBox>hi</StyledCardBox>
              </Box>
            </Box>
          </ResizableBox>
        </StyledDialog>
      </Draggable>
    </React.Fragment>
  )
}
