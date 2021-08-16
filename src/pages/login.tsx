import React from 'react';
import Layout from 'src/components/Layout';
import Header from 'src/components/Header';
import Login from 'src/components/login';

const SignIn = () => {
  return (
    <Layout title='Login page'>
      <Header />
      <Login />
    </Layout>
  );
};

export default SignIn;
