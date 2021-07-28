import Head from 'next/head';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AppProps} from 'next/app';
import 'src/styles/globals.css';
import "src/styles/graph.css"
import config from '../../aws-exports'
import Amplify from 'aws-amplify';

Amplify.configure({...config, ssr: true});

function DentalApp({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>

      <Head>
        <title>Dental App</title>
        <link rel="stylesheet" href="/favicon.ico"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@400;700&display=swap"
        />
        <meta charSet="utf-8"/>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default DentalApp;
