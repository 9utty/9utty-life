/* eslint-disable @typescript-eslint/no-unused-vars */
/** @format */

import React from 'react'
import { Box, Typography } from '@mui/material'

type Props = {
  open: boolean
  onClose: () => void
  menuChildren: React.ReactNode
}

export default function WindowMenuBar({ open, onClose, menuChildren }: Props) {
  if (!open) return null

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '36px',
        left: '1px',
        minWidth: '200px',
        backgroundColor: 'rgb(198, 198, 198)',
        border: '2px solid #fff',
        borderColor:
          'rgb(254, 254, 254) rgb(132, 133, 132) rgb(132, 133, 132) rgb(254, 254, 254)',
        zIndex: 1001,
        padding: '10px'
      }}
    >
      {menuChildren}
    </Box>
  )
}
