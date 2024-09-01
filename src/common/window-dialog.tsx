/* eslint-disable @typescript-eslint/no-unused-vars */
/** @format */

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import { MainMenu } from 'src/components/main-menu'
import { useRouter } from 'next/router'
import Image from 'next/image'

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border: 2px solid #808080;
    border-right-color: #fff;
    border-bottom-color: #fff;
    border-left-color: #808080;
    border-top-color: #808080;
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
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
`

const StyledDialogActions = styled(DialogActions)`
  background-color: #c0c0c0;
  padding: 5px;
`

type DialogProps = {
  dialog: {
    main: MainMenu
    open: boolean
    isFocus: boolean
    size: { width: number; height: number }
    position: { top: string; left: string }
  }
  handleOpen: (main: MainMenu) => void
  handleFocus: (main: MainMenu) => void
  handleResize: (
    main: MainMenu,
    event: any,
    { size }: { size: { width: number; height: number } }
  ) => void
  handleResizeStart: (main: MainMenu) => void
  handleResizeStop: (main: MainMenu) => void
  handleDragStart: (main: MainMenu) => void
  handleDragStop: (main: MainMenu) => void
  handleBlur: (main: MainMenu) => void
  onClose: (main: MainMenu) => void
}

export default function WindowDialog({
  dialog,
  handleOpen,
  handleFocus,
  handleResize,
  handleBlur,
  onClose,
  handleResizeStart,
  handleResizeStop,
  handleDragStart,
  handleDragStop
}: DialogProps) {
  const draggableRef = React.useRef(null)

  const router = useRouter()
  const query = router.query

  return (
    <React.Fragment>
      <Button onClick={() => handleOpen(dialog.main)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Image
            src={'/directory_open_cool-0.png'}
            alt={dialog.main.name}
            width={70}
            height={70}
            priority={true}
          ></Image>
          <Typography variant='body1' color='white'>
            {dialog.main.name}
          </Typography>
        </Box>
      </Button>
      {dialog.open && (
        <Draggable
          handle='.MuiDialogTitle-root'
          nodeRef={draggableRef}
          onMouseDown={() => handleFocus(dialog.main)}
          onStart={() => handleDragStart(dialog.main)}
          onStop={() => handleDragStop(dialog.main)}
        >
          <StyledDialog
            ref={draggableRef}
            open={dialog.open}
            maxWidth='lg'
            fullScreen={true}
            sx={{
              position: 'absolute',
              top: dialog.position.top,
              left: dialog.position.left,
              width: dialog.size.width,
              height: dialog.size.height,
              m: 0,
              zIndex: dialog.isFocus ? 1001 : 1000,
              '.MuiPaper-root': {
                width: dialog.size.width,
                height: dialog.size.height
              }
            }}
            hideBackdrop={true}
            onBlur={() => handleBlur(dialog.main)}
            onClick={() => handleFocus(dialog.main)}
            tabIndex={-1}
          >
            <ResizableBox
              width={dialog.size.width}
              height={dialog.size.height}
              minConstraints={[200, 200]}
              onResizeStart={() => handleResizeStart(dialog.main)}
              onResizeStop={() => handleResizeStop(dialog.main)}
              onResize={(e, data) => handleResize(dialog.main, e, data)}
            >
              <Box sx={{ width: '100%', height: '100%' }}>
                <StyledDialogTitle
                  sx={{
                    backgroundColor: dialog.isFocus ? '#000080' : '#c6c6c6' // Change background color based on zIndex
                  }}
                >
                  {dialog.main.name}
                </StyledDialogTitle>

                <iframe
                  src={`http://localhost:3001/${dialog.main.name}`}
                  width={dialog.size.width}
                />

                <StyledDialogActions>
                  <Button
                    onClick={() => onClose(dialog.main)}
                    variant='contained'
                  >
                    Close
                  </Button>
                </StyledDialogActions>
              </Box>
            </ResizableBox>
          </StyledDialog>
        </Draggable>
      )}
    </React.Fragment>
  )
}
