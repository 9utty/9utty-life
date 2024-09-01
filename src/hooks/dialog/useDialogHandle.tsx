/** @format */

import React from 'react'
import { DialogFormType } from './useDialogForm'
import { useRouter } from 'next/router'

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
  handleSearch: (searchText: string) => void
}

type Props = {
  form: DialogFormType
}

export default function useDialogHandle({ form }: Props): DialogHandle {
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
    if (globalThis === window) {
      setValue('searchText', `${window.location.pathname}`)
    }
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
    setValue('isFocus', false)
  }, [setValue])

  const handleDragStart = React.useCallback(() => {
    setValue('isDrag', true)
    setValue('isFocus', true)
  }, [setValue])

  const handleDragStop = React.useCallback(() => {
    setValue('isDrag', false)
    setValue('isFocus', false)
  }, [setValue])

  const handleBlur = React.useCallback(() => {
    setValue('isFocus', false)
  }, [setValue])

  const handleClose = React.useCallback(() => {
    setValue('open', false)
    setValue('isFocus', false)
    router.push('/')
  }, [setValue, router])

  const handleSearch = React.useCallback(
    (searchText: string) => {
      router.push(searchText)
      console.log(searchText)
    },
    [router]
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
