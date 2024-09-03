/** @format */

import React from 'react'
import { DialogFormType } from './useDialogForm'
import { useRouter } from 'next/router'
import stringSimilarity from 'string-similarity'
import { ItemSummary } from 'src/types'

const randomPosition = () => `${10 + Math.random() * 35}%`

export type DialogHandle = {
  handleBlur: () => void
  handleClose: () => void
  handleDragStart: () => void
  handleDragStop: () => void
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
  const { setValue } = form
  const router = useRouter()

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
    console.log('handleBlur')
  }, [setValue])

  const handleClose = React.useCallback(() => {
    setValue('open', false)
    setValue('isFocus', false)
    router.push('/')
  }, [setValue, router])

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
    handleBlur,
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
