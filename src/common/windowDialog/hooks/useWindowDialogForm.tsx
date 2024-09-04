/** @format */

import React from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

export type WindowDialogFormDefaultValuesType = {
  open: boolean
  size: { width: number; height: number }
  position: { top: string; left: string }
}

export type WindowDialogFormType =
  UseFormReturn<WindowDialogFormDefaultValuesType>

export default function useWindowDialogForm(): WindowDialogFormType {
  const form = useForm<WindowDialogFormDefaultValuesType>({
    defaultValues: {
      open: false,
      size: { width: 0, height: 0 },
      position: { top: '0', left: '0' }
    }
  })

  return React.useMemo(() => form, [form])
}
