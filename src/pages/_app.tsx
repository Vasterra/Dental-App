import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import config from '../../aws-exports';
import Amplify from 'aws-amplify';

Amplify.configure({ ...config, ssr: true });

function DentalApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  // const stripePromise = loadStripe(
  //   'pk_test_51J15W0B5Yj7B7VjGcyWF6fMvy3UkvUUS5l6YJ3LQqLGFGZgK7UwNyVHLMMVi2HgDweAsAUxkhuukQBjWlTshTPmu00NmYIp1nd'
  // );

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Elements stripe={stripePromise}> */}
        <Component {...pageProps} />
      {/* </Elements> */}
    </QueryClientProvider>
  );
}

export default DentalApp;
