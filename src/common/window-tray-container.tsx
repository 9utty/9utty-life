/** @format */

import React from 'react'
import { Box, styled, Typography } from '@mui/material'

const TrayContainer = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #c0c0c0;
  border: 2px solid #808080;
  border-right-color: #fff;
  border-bottom-color: #fff;
  border-left-color: #808080;
  border-top-color: #808080;
  padding: 2px 5px;
  color: black;
`

const Time = styled(Typography)`
  padding: 0 5px;
`

export default function WindowTrayContainer() {
  const [hour, setHour] = React.useState<string>('')
  const [minute, setMinute] = React.useState<string>('')
  const [ampm, setAmpm] = React.useState<string>('')

  React.useEffect(() => {
    const date = new Date()
    setHour(
      date.getHours().toString().length === 1
        ? '0' + date.getHours().toString()
        : date.getHours().toString()
    )
    setMinute(
      date.getMinutes().toString().length === 1
        ? '0' + date.getMinutes().toString()
        : date.getMinutes().toString()
    )
    setAmpm(date.getHours() >= 12 ? 'PM' : 'AM')

    const interval = setInterval(() => {
      setHour(
        new Date().getHours().toString().length === 1
          ? '0' + new Date().getHours().toString()
          : new Date().getHours().toString()
      )
      setMinute(
        new Date().getMinutes().toString().length === 1
          ? '0' + new Date().getMinutes().toString()
          : new Date().getMinutes().toString()
      )
      setAmpm(new Date().getHours() >= 12 ? 'PM' : 'AM')
    }, 60000) // 1 minute interval

    return () => {
      clearInterval(interval)
      setHour('')
      setMinute('')
      setAmpm('')
    }
  }, [])

  return (
    <TrayContainer>
      <Time variant='body1' sx={{ userSelect: 'none' }}>
        {hour}:{minute} {ampm}
      </Time>
    </TrayContainer>
  )
}

React.memo(WindowTrayContainer)
