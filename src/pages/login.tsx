import React from 'react';
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import Dashboard from './admin/dashboard';

const Login = () => {
  return  <AmplifyAuthenticator>
    <AmplifySignIn
      headerText='Sign In Admin Panel FYD'
      slot='sign-in'
      hideSignUp={true}
    />
    <Dashboard />
  </AmplifyAuthenticator>
};

export default Login;