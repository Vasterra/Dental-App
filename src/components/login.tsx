import React from "react";

import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import Dashboard from 'src/pages/dashboard';

const Login = ({}) => {
    return (
      <AmplifyAuthenticator>
          <Dashboard />
      </AmplifyAuthenticator>
    );
};

export default Login;
