import App from "next/app";
import React from "react";
import {ApolloProvider} from '@apollo/client/react';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import withApollo from "../lib/withApollo";
import '../styles/globals.css'
import '../configureAmplify'
import {QueryClient, QueryClientProvider} from "react-query";

class DentalApp extends App<any> {
  render() {
    const {Component, pageProps, apolloClient} = this.props;
    const queryClient = new QueryClient()
    const stripePromise = loadStripe("pk_test_51J15W0B5Yj7B7VjGcyWF6fMvy3UkvUUS5l6YJ3LQqLGFGZgK7UwNyVHLMMVi2HgDweAsAUxkhuukQBjWlTshTPmu00NmYIp1nd");
    return (
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        </QueryClientProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(DentalApp);
