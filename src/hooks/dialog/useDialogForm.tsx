/** @format */

import React from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

export type DialogFormDefaultValuesType = {
  path: string
  open: boolean
  size: { width: number; height: number }
  position: { top: string; left: string }
  searchText: string
  isSearch: boolean
}

export type DialogFormType = UseFormReturn<DialogFormDefaultValuesType>

export default function useDialogForm(): DialogFormType {
  const form = useForm<DialogFormDefaultValuesType>({
    defaultValues: {
      path: '',
      open: false,
      size: { width: 0, height: 0 },
      position: { top: '0', left: '0' },
      searchText: '',
      isSearch: false
    }
  })

  return React.useMemo(() => form, [form])
}
