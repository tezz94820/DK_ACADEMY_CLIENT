import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import store from '@/app/store';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DK Academy</title>
        <link rel="shortcut icon" href="/favicon.ICO" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
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
