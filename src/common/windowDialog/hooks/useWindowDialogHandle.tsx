/** @format */

import React from 'react'
import { WindowDialogFormType } from './useWindowDialogForm'
import { useFormContext } from 'react-hook-form'
import { DialogFormDefaultValuesType } from 'src/pages/_app'
import { DialogType } from 'src/types/enums/dialogEnum'
import { DraggableData, DraggableEvent } from 'react-draggable'

const randomPosition = (max: number) => `${Math.floor(Math.random() * max)}px`

export type WindowDialogHandle = {
  handleClose: () => void
  handleDragStart: () => void
  handleDragStop: (e: DraggableEvent, data: DraggableData) => void
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
  const { setValue: dialogSetValue, watch: dialogWatch } =
    useFormContext<DialogFormDefaultValuesType>()
  const { setValue, watch } = form

  const dialogType = dialogWatch('type')
  const openCount = dialogWatch('openCount')
  const open = watch('open')
  const sizeValue = watch('size')
  const position = watch('position')

  const handleOpen = React.useCallback(() => {
    setValue('open', true)
    const data = localStorage.getItem(`${DialogType.GUEST_BOOK}`)
    let newPosition = {
      top: randomPosition(window.innerHeight - 350),
      left: randomPosition(window.innerWidth - 350)
    }
    if (data) {
      newPosition = JSON.parse(data).position
      const size = JSON.parse(data).size
      const open = JSON.parse(data).open
      setValue('size', size)
      setValue('open', open)
      setValue('position', newPosition)
    } else {
      setValue('position', newPosition)
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          `${DialogType.GUEST_BOOK}`,
          JSON.stringify({
            position: newPosition,
            open: true,
            size: {
              width: 850,
              height: 650
            }
          })
        )
      }
      setValue('size', {
        width: 850,
        height: 650
      })
    }
    dialogSetValue('type', DialogType.POST)
    dialogSetValue('openCount', openCount + 1)
  }, [setValue, openCount, dialogSetValue])

  const handleFocus = React.useCallback(() => {
    if (dialogType !== DialogType.GUEST_BOOK) {
      dialogSetValue('type', DialogType.GUEST_BOOK)
    }
  }, [dialogType, dialogSetValue])

  const handleResize = React.useCallback(
    ({ size }: { size: { width: number; height: number } }) => {
      setValue('size', size)
      if (dialogType !== DialogType.GUEST_BOOK) {
        dialogSetValue('type', DialogType.GUEST_BOOK)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          `${DialogType.GUEST_BOOK}`,
          JSON.stringify({
            position: position,
            open: open,
            size: size
          })
        )
      }
    },
    [dialogType, dialogSetValue, setValue, position, open]
  )

  const handleResizeStart = React.useCallback(() => {
    if (dialogType !== DialogType.GUEST_BOOK) {
      dialogSetValue('type', DialogType.GUEST_BOOK)
    }
  }, [dialogType, dialogSetValue])

  const handleResizeStop = React.useCallback(() => {
    if (dialogType !== DialogType.GUEST_BOOK) {
      dialogSetValue('type', DialogType.GUEST_BOOK)
    }
  }, [dialogType, dialogSetValue])

  const handleDragStart = React.useCallback(() => {
    if (dialogType !== DialogType.GUEST_BOOK) {
      dialogSetValue('type', DialogType.GUEST_BOOK)
    }
  }, [dialogType, dialogSetValue])

  const handleDragStop = React.useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      if (dialogType !== DialogType.GUEST_BOOK) {
        dialogSetValue('type', DialogType.GUEST_BOOK)
      }
      const { top, left } = form.watch('position')
      const topNumber = parseInt(top.replace('px', ''))
      const leftNumber = parseInt(left.replace('px', ''))
      const newPosition = {
        top: `${topNumber + data.y}px`,
        left: `${leftNumber + data.x}px`
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          `${DialogType.GUEST_BOOK}`,
          JSON.stringify({
            position: newPosition,
            open: open,
            size: sizeValue
          })
        )
      }
    },
    [dialogType, dialogSetValue, form, sizeValue, open]
  )

  const handleClose = React.useCallback(() => {
    setValue('open', false)
    if (openCount === 1) {
      dialogSetValue('type', DialogType.NONE)
    } else {
      dialogSetValue('openCount', openCount - 1)
      dialogSetValue('type', DialogType.GUEST_BOOK)
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`${DialogType.GUEST_BOOK}`)
    }
  }, [setValue, openCount, dialogSetValue])

  return {
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
