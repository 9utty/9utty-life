/** @format */

import React from 'react'
import { DialogFormType } from './useDialogForm'
import { useRouter } from 'next/router'
import stringSimilarity from 'string-similarity'
import { ItemSummary } from 'src/types'
import { DialogType } from 'src/types/enums/dialogEnum'
import { useFormContext } from 'react-hook-form'
import { DialogFormDefaultValuesType } from 'src/pages/_app'
import { DraggableData, DraggableEvent } from 'react-draggable'

const randomPosition = (max: number) => `${Math.floor(Math.random() * max)}px`

export type DialogHandle = {
  handleClose: () => void
  handleDragStart: () => void
  handleDragStop: (e: DraggableEvent, data: DraggableData) => void
  handleFocus: () => void
  handleOpen: () => void
  handleResize: ({ size }: { size: { width: number; height: number } }) => void
  handleResizeStart: () => void
  handleResizeStop: () => void
  handleSearch: (searchText: string) => ItemSummary[]
}

type Props = {
  form: DialogFormType
  items: ItemSummary[]
}

export default function useDialogHandle({ form, items }: Props): DialogHandle {
  const { watch: dialogWatch, setValue: dialogSetValue } =
    useFormContext<DialogFormDefaultValuesType>()
  const { setValue, watch } = form
  const router = useRouter()
  const openCount = dialogWatch('openCount')
  const dialogType = dialogWatch('type')
  const open = watch('open')
  const sizeValue = watch('size')
  const position = watch('position')

  const handleOpen = React.useCallback(() => {
    setValue('open', true)
    const data = localStorage.getItem(`${DialogType.POST}`)
    let newPosition = {
      top: randomPosition(window.innerHeight - 350),
      left: randomPosition(window.innerWidth - 350)
    }
    if (data) {
      newPosition = JSON.parse(data).position
      const size = JSON.parse(data).size
      setValue('size', size)
      setValue('position', newPosition)
    } else {
      setValue('position', newPosition)
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          `${DialogType.POST}`,
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
    if (dialogType !== DialogType.POST) {
      dialogSetValue('type', DialogType.POST)
    }
  }, [dialogType, dialogSetValue])

  const handleResize = React.useCallback(
    ({ size }: { size: { width: number; height: number } }) => {
      setValue('size', size)
      if (dialogType !== DialogType.POST) {
        dialogSetValue('type', DialogType.POST)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          `${DialogType.POST}`,
          JSON.stringify({
            position: position,
            open: open,
            size: size
          })
        )
      }
    },
    [setValue, dialogType, dialogSetValue, position, open]
  )

  const handleResizeStart = React.useCallback(() => {
    if (dialogType !== DialogType.POST) {
      dialogSetValue('type', DialogType.POST)
    }
  }, [dialogSetValue, dialogType])

  const handleResizeStop = React.useCallback(() => {
    if (dialogType !== DialogType.POST) {
      dialogSetValue('type', DialogType.POST)
    }
  }, [dialogSetValue, dialogType])

  const handleDragStart = React.useCallback(() => {
    if (dialogType !== DialogType.POST) {
      dialogSetValue('type', DialogType.POST)
    }
  }, [dialogSetValue, dialogType])

  const handleDragStop = React.useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      const { top, left } = form.watch('position')
      const topNumber = parseInt(top.replace('px', ''))
      const leftNumber = parseInt(left.replace('px', ''))
      const newPosition = {
        top: `${topNumber + data.y}px`,
        left: `${leftNumber + data.x}px`
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          `${DialogType.POST}`,
          JSON.stringify({
            position: newPosition,
            open: true,
            size: sizeValue
          })
        )
      }
      if (dialogType !== DialogType.POST) {
        dialogSetValue('type', DialogType.POST)
      }
    },
    [dialogSetValue, dialogType, form, sizeValue]
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
      localStorage.removeItem(`${DialogType.POST}`)
    }
    router.push('/')
  }, [setValue, openCount, router, dialogSetValue])

  const handleSearch = React.useCallback(
    (searchText: string): ItemSummary[] => {
      const matches = items.filter(
        item =>
          stringSimilarity.compareTwoStrings(
            item.title.toLowerCase(),
            searchText
          ) > 0.2
      )

      return matches
    },
    [items]
  )

  return {
    handleClose,
    handleDragStart,
    handleDragStop,
    handleFocus,
    handleOpen,
    handleResize,
    handleResizeStart,
    handleResizeStop,
    handleSearch
  }
}
