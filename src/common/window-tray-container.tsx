import React from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

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
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 60000) // 1 minute interval

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes

    return `${hours}:${minutesStr} ${ampm}`
  }

  return (
    <TrayContainer>
      <Time variant='body1' sx={{ userSelect: 'none' }}>
        {formatTime(time)}
      </Time>
    </TrayContainer>
  )
}
