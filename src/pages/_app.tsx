/** @format */

import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from 'src/theme'
import Head from 'next/head'
import MainMenus, { MemoMainMenus } from 'src/components/main-menu'
import WindowBar from 'src/components/window-bar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>구티의 블로그</title>
        <meta name='description' content='구티의 블로그' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='https://user-images.githubusercontent.com/86397600/236520751-cbe5955c-0ec5-46d8-bc42-130ef3c62a1f.png'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <MemoMainMenus />
        <Component {...pageProps} />
        <WindowBar />
      </ThemeProvider>
    </>
  )
}
