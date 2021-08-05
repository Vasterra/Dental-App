import Head from 'next/head';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { loadStripe } from '@stripe/stripe-js';
import theme from '../theme';
import { Elements } from '@stripe/react-stripe-js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import config from '../../aws-exports'
import Amplify from 'aws-amplify';

Amplify.configure({ ...config, ssr: true });

function DentalApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const stripePromise = loadStripe(
    'pk_test_51J15W0B5Yj7B7VjGcyWF6fMvy3UkvUUS5l6YJ3LQqLGFGZgK7UwNyVHLMMVi2HgDweAsAUxkhuukQBjWlTshTPmu00NmYIp1nd'
  );

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      // @ts-ignore
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>

      </Elements>
    </QueryClientProvider>
  );
}

export default DentalApp;
