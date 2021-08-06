import React from 'react';
import { AmplifyAuthContainer, AmplifyAuthenticator } from '@aws-amplify/ui-react';
import Dashboard from 'src/pages/admin/dashboard';

const Login = () => {
  return (
    <AmplifyAuthContainer>
      <AmplifyAuthenticator>
        <Dashboard />
      </AmplifyAuthenticator>
    </AmplifyAuthContainer>

  );
};

export default Login;

