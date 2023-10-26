import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DK Academy</title>
        <link rel="shortcut icon" href="/favicon.ICO" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Analytics />
    </>

  )
}
