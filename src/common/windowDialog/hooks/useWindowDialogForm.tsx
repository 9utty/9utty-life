/** @format */

import React from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

export type WindowDialogFormDefaultValuesType = {
  open: boolean
  isFocus: boolean
  isResize: boolean
  isDrag: boolean
  size: { width: number; height: number }
  position: { top: string; left: string }
  backHistory: string[]
  forwardHistory: string[]
  currentHistory: string
}

export type WindowDialogFormType =
  UseFormReturn<WindowDialogFormDefaultValuesType>

export default function useWindowDialogForm(): WindowDialogFormType {
  const form = useForm<WindowDialogFormDefaultValuesType>({
    defaultValues: {
      open: false,
      isFocus: false,
      isResize: false,
      isDrag: false,
      size: { width: 0, height: 0 },
      position: { top: '0', left: '0' },
      backHistory: [],
      forwardHistory: [],
      currentHistory: ''
    }
  })

  return React.useMemo(() => form, [form])
}
