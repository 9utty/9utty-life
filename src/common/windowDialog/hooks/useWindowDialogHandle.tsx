/** @format */

import React from 'react'
import { WindowDialogFormType } from './useWindowDialogForm'

const randomPosition = () => `${10 + Math.random() * 35}%`

export type WindowDialogHandle = {
  handleBlur: () => void
  handleClose: () => void
  handleDragStart: () => void
  handleDragStop: () => void
  handleFocus: () => void
  handleOpen: () => void
  handleResize: ({ size }: { size: { width: number; height: number } }) => void
  handleResizeStart: () => void
  handleResizeStop: () => void
}

type Props = {
  form: WindowDialogFormType
}

export default function useWindowDialogHandle({
  form
}: Props): WindowDialogHandle {
  const { setValue } = form

  const handleOpen = React.useCallback(() => {
    setValue('open', true)
    setValue('isFocus', true)
    setValue('position', {
      top: randomPosition(),
      left: randomPosition()
    })
    setValue('size', {
      width: 850,
      height: 650
    })
  }, [setValue])

  const handleFocus = React.useCallback(() => {
    setValue('isFocus', true)
  }, [setValue])

  const handleResize = React.useCallback(
    ({ size }: { size: { width: number; height: number } }) => {
      setValue('size', size)
      setValue('isResize', true)
      setValue('isFocus', true)
    },
    [setValue]
  )

  const handleResizeStart = React.useCallback(() => {
    setValue('isResize', true)
    setValue('isFocus', true)
  }, [setValue])

  const handleResizeStop = React.useCallback(() => {
    setValue('isResize', false)
    setValue('isFocus', true)
  }, [setValue])

  const handleDragStart = React.useCallback(() => {
    setValue('isDrag', true)
    setValue('isFocus', true)
  }, [setValue])

  const handleDragStop = React.useCallback(() => {
    setValue('isDrag', false)
    setValue('isFocus', true)
  }, [setValue])

  const handleBlur = React.useCallback(() => {
    setValue('isFocus', false)
  }, [setValue])

  const handleClose = React.useCallback(() => {
    setValue('open', false)
    setValue('isFocus', false)
  }, [setValue])

  return {
    handleBlur,
    handleClose,
    handleDragStart,
    handleDragStop,
    handleFocus,
    handleOpen,
    handleResize,
    handleResizeStart,
    handleResizeStop
  }
}
