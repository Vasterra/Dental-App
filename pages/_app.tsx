import '../styles/globals.css'
import '../configureAmplify'
import App from "next/app";
import React from "react";
import {ApolloProvider} from '@apollo/client/react';

import withApollo from "../lib/withApollo";
import {QueryClientProvider, QueryClient} from "react-query";

class MyApp extends App<any> {
  render() {
    const {Component, pageProps, apolloClient} = this.props;
    const queryClient = new QueryClient()
    return (
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
