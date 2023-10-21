import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header';
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DK Academy</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>

  )
}
