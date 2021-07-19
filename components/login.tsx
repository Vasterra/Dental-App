import React from "react";

import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import Dashboard from '../pages/admin/dashboard';

const Login = ({}) => {
    return (
      <AmplifyAuthenticator>
          <Dashboard />
      </AmplifyAuthenticator>
    );
};

export default Login;

