import App from "next/app";
import Head from "next/head";
import React from "react";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js";
import {QueryClient, QueryClientProvider} from "react-query";

import '../styles/globals.css'
import config from '../../aws-exports'
import Amplify from "aws-amplify";

Amplify.configure({ ...config, ssr: true });

class DentalApp extends App<any> {
  render() {
    const {Component, pageProps, router} = this.props;
    const queryClient = new QueryClient()
    const stripePromise = loadStripe("pk_test_51J15W0B5Yj7B7VjGcyWF6fMvy3UkvUUS5l6YJ3LQqLGFGZgK7UwNyVHLMMVi2HgDweAsAUxkhuukQBjWlTshTPmu00NmYIp1nd");
    return (
        <QueryClientProvider client={queryClient}>
          <Elements stripe={stripePromise}>
            <Head>
              <title>Dental App</title>
              <meta charSet="utf-8"/>
              <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
              <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
            </Head>
            <Component {...pageProps} />
          </Elements>
        </QueryClientProvider>
    );
  }
}

export default DentalApp;
