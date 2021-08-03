import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AppProps} from 'next/app';
import 'src/styles/globals.css';
import "src/styles/graph.css"
import "src/styles/users.css"
import "src/styles/subscriber.css"
import config from '../../aws-exports'
import Amplify from 'aws-amplify';

Amplify.configure({...config, ssr: true});

function DentalApp({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default DentalApp;
