import React from 'react'

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='ko'>
      <Head />
      <Head>
        <meta name='description' content='구티의 블로그' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
