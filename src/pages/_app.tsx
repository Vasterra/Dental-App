import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';
import 'src/styles/globals.css';
import 'src/styles/graph.css';
import 'src/styles/users.css';
import 'src/styles/subscriber.css';
import config from '../aws-exports.js';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

Amplify.configure({ ...config, ssr: true });

function DentalApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState: any, authData: any) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText='Sign In Admin Panel FYD'
        slot='sign-in'
        hideSignUp={true}
      />
    </AmplifyAuthenticator>
  );
}

export default DentalApp;
