import { Html, Head, Main, NextScript, Script } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href= {`/assets/shopexpress.jpg`} type="image/x-icon" />
      </Head>
      <body className='scrollbar-main'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

