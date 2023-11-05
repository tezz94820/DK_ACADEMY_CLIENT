import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DK Academy</title>
        <link rel="shortcut icon" href="/favicon.ICO" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        // pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
        transition={Slide}
        theme='colored'
      />
    </>

  )
}
