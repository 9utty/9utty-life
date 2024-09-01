/** @format */

import { Box, Typography } from '@mui/material'
import React from 'react'
import WindowButton from 'src/common/window-button'
import WindowMenuBar from 'src/common/window-menu-bar'
import WindowTrayContainer from 'src/common/window-tray-container'

export default function WindowBar() {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleOpen = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'rgb(198, 198, 198)',
        border: '3px solid #fff',
        borderColor:
          'rgb(254, 254, 254) rgb(132, 133, 132) rgb(132, 133, 132) rgb(254, 254, 254)',
        pb: '0.5px',
        pt: '3px',
        pl: '1px'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <WindowButton
          onClick={handleOpen}
          textLeftIcon={
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='16' height='16' fill='url(#pattern0_101_2)' />
              <defs>
                <pattern
                  id='pattern0_101_2'
                  patternContentUnits='objectBoundingBox'
                  width='1'
                  height='1'
                >
                  <use xlinkHref='#image0_101_2' transform='scale(0.0625)' />
                </pattern>
                <image
                  id='image0_101_2'
                  width='16'
                  height='16'
                  xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAFVBMVEUAAAAAAAD/AAAA/wAAAP///wD///+oQXrmAAAAAXRSTlMAQObYZgAAAAFiS0dEBmFmuH0AAAAHdElNRQfiBhoAOBwkIrLGAAAAWUlEQVQI102Oyw2AQAhE2Q54fu4rHRgbWBMa8GD/rQjrxjgX3gQyg8hfBR2ToGAmdkQVjIPwA2rgxhxQjZSIGQsX0mLl3AHNXxB3TlZ6YD/OQI2W9NlYvg8eYH4JE04wi3cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjZUMDA6NTY6MjgtMDQ6MDCN82qqAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI2VDAwOjU2OjI4LTA0OjAw/K7SFgAAAABJRU5ErkJggg=='
                />
              </defs>
            </svg>
          }
        >
          <Typography variant='h6' sx={{ userSelect: 'none' }}>
            Start
          </Typography>
        </WindowButton>
        <WindowMenuBar open={open} onClose={handleClose} menuChildren={<></>} />
        <WindowTrayContainer />
      </Box>
    </Box>
  )
}
