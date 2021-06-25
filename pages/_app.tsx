import App from "next/app";
import React from "react";
import {ApolloProvider} from '@apollo/client/react';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import withApollo from "../lib/withApollo";
import '../styles/globals.css'
import '../configureAmplify'
import {QueryClientProvider, QueryClient} from "react-query";

class MyApp extends App<any> {
  render() {
    const {Component, pageProps, apolloClient} = this.props;
    const queryClient = new QueryClient()
    const stripePromise = loadStripe("pk_test_51ISNerEE2uETn4H3tqYplaINZlDwEa8CM7ohtp7YbxF7KJnUysRK8rjssQxSbruzaL6uJz4951GhHoZcHM3qWcLN00drEQTQ5M");
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

export default withApollo(MyApp);