/** @format */

import { CardContent } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import WindowDialog from 'src/common/window-dialog'

export type SubMenu = {
  id: number
  mainMenuId: number
  name: string
  createdAt: string
  updatedAt: string
}

export type BlogItem = {
  id: number
  mainMenuId: number | null
  subMenuId: number | null
  title: string
  path: string
  viewCount: number
  tag: string
  createdAt: string
  updatedAt: string
}

export type MainMenu = {
  id: number
  name: string
  createAt: string
  updateAt: string
}

export type DialogState = {
  main: MainMenu
  open: boolean
  isFocus: boolean
  isResize: boolean
  isDrag: boolean
  size: { width: number; height: number }
  position: { top: string; left: string }
}

const randomPosition = () => `${10 + Math.random() * 35}%`

export const MemoMainMenus = React.memo(MainMenus)

type Props = {
  children: React.ReactNode
}
export default function MainMenus({ children }: Props) {
  const [dialogs, setDialogs] = React.useState<DialogState[]>([])

  const route = useRouter()

  console.log('dialogs', dialogs)

  const handleOpen = React.useCallback(
    (main: MainMenu) => {
      const find = dialogs.find(dialog => dialog.main.name === main.name)
      if (find) {
        find.open = true
        find.isFocus = true
        const filterDialogs = dialogs.filter(
          dialog => dialog.main.name !== main.name
        )
        const newDialogs = [...filterDialogs, find]
        setDialogs(newDialogs)
      }
      route.push(`?main=${main.name}`)
    },
    [dialogs, route]
  )

  const handleFocus = React.useCallback(
    (main: MainMenu) => {
      const find = dialogs.find(dialog => dialog.main.name === main.name)
      if (find) {
        find.isFocus = true
        const filterDialogs = dialogs.filter(
          dialog => dialog.main.name !== main.name
        )
        const newDialogs = [...filterDialogs, find]
        setDialogs(newDialogs)

        route.push(`?main=${main.name}`)
      }
    },
    [dialogs, route]
  )

  const handleResize = React.useCallback(
    (
      main: MainMenu,
      event: any,
      { size }: { size: { width: number; height: number } }
    ) => {
      const find = dialogs.find(dialog => dialog.main.name === main.name)
      if (find) {
        find.size = size
        find.isResize = true
        find.isFocus = true
        const filterDialogs = dialogs.filter(
          dialog => dialog.main.name !== main.name
        )
        const newDialogs = [...filterDialogs, find]
        setDialogs(newDialogs)
      }
    },
    [dialogs]
  )

  const handleResizeStart = (main: MainMenu) => {
    const find = dialogs.find(dialog => dialog.main.name === main.name)
    if (find) {
      find.isResize = true
      find.isFocus = true
      const filterDialogs = dialogs.filter(
        dialog => dialog.main.name !== main.name
      )
      const newDialogs = [...filterDialogs, find]
      setDialogs(newDialogs)
    }
  }

  const handleResizeStop = (main: MainMenu) => {
    const find = dialogs.find(dialog => dialog.main.name === main.name)
    if (find) {
      find.isResize = false
      find.isFocus = false
      const filterDialogs = dialogs.filter(
        dialog => dialog.main.name !== main.name
      )
      const newDialogs = [...filterDialogs, find]
      setDialogs(newDialogs)
    }
  }

  const handleDragStart = (main: MainMenu) => {
    const find = dialogs.find(dialog => dialog.main.name === main.name)
    if (find) {
      find.isDrag = true
      find.isFocus = true
      const filterDialogs = dialogs.filter(
        dialog => dialog.main.name !== main.name
      )
      const newDialogs = [...filterDialogs, find]
      setDialogs(newDialogs)
    }
  }

  const handleDragStop = (main: MainMenu) => {
    const find = dialogs.find(dialog => dialog.main.name === main.name)
    if (find) {
      const filterDialogs = dialogs.filter(
        dialog => dialog.main.name !== main.name
      )
      find.isDrag = false
      const newDialogs = [...filterDialogs, find]
      setDialogs(newDialogs)
    }
  }

  const handleBlur = React.useCallback(
    (main: MainMenu) => {
      const find = dialogs.find(dialog => dialog.main.name === main.name)
      if (find) {
        const filterDialogs = dialogs.filter(
          dialog => dialog.main.name !== main.name
        )
        find.isFocus = false
        const newDialogs = [...filterDialogs, find]
        setDialogs(newDialogs)
      }
    },
    [dialogs]
  )

  const onClose = React.useCallback(
    (main: MainMenu) => {
      const find = dialogs.find(dialog => dialog.main.name === main.name)

      if (find) {
        find.open = false
        find.isFocus = false
        const filterDialogs = dialogs.filter(
          dialog => dialog.main.name !== main.name
        )
        const newDialogs = [...filterDialogs, find]
        setDialogs(newDialogs)
      }
    },
    [dialogs]
  )

  React.useEffect(() => {
    const getMenu = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL
        : 'http://localhost:3000'
      console.log('getMenu')
      const response = await fetch(`${baseUrl}/api/mainList`, {
        next: {
          revalidate: 600
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const blogData: MainMenu[] = await response.json()

      const dialogs = blogData.map(main => ({
        main: main,
        open: false,
        isFocus: false,
        size: { width: 350, height: 350 },
        position: { top: randomPosition(), left: randomPosition() },
        isResize: false,
        isDrag: false
      }))
      setDialogs(dialogs)
    }
    getMenu()

    return () => {
      console.log('clean up')
      setDialogs([])
    }
  }, [])

  return (
    <CardContent
      sx={{ width: '100vw', display: 'flex', justifyContent: 'start', gap: 4 }}
    >
      {dialogs.map(dialog => {
        return (
          <WindowDialog
            key={dialog.main.name}
            dialog={dialog}
            handleOpen={handleOpen}
            handleFocus={handleFocus}
            handleResize={handleResize}
            handleBlur={handleBlur}
            onClose={onClose}
            handleResizeStart={handleResizeStart}
            handleResizeStop={handleResizeStop}
            handleDragStart={handleDragStart}
            handleDragStop={handleDragStop}
          />
        )
      })}
      {children}
    </CardContent>
  )
}
