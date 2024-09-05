/** @format */

import 'src/styles/globals.css'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from 'src/theme'
import Head from 'next/head'
import WindowBar from 'src/components/window-bar'
import MenesComponent from 'src/components/menes'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { createEmotionCache } from 'src/theme/createEmotionCache'
import { DialogType } from 'src/types/enums/dialogEnum'
import { FormProvider, useForm } from 'react-hook-form'
import { Analytics } from '@vercel/analytics/react'

const clientSideEmotionCache = createEmotionCache()

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

export type DialogFormDefaultValuesType = {
  type: DialogType
  openCount: number
}

export default function App(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const form = useForm<DialogFormDefaultValuesType>({
    defaultValues: {
      type: DialogType.NONE,
      openCount: 0
    }
  })

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>구티의 블로그</title>
        <meta name='description' content='구티의 블로그' />
        <link rel='icon' sizes='any' href='/blog-favicon.png' />
      </Head>
      <ThemeProvider theme={theme}>
        <FormProvider {...form}>
          <MenesComponent>
            <Component {...pageProps} />
            <Analytics />
          </MenesComponent>
        </FormProvider>
        <WindowBar />
      </ThemeProvider>
    </CacheProvider>
  )
}
