import React from "react";
import Layout from "src/components/Layout";
import Header from "src/components/Header";
import Registration from "src/components/registration";

const SignUp = () => {

  return (
    <Layout title="Register page">
      <Header/>
      <Registration />
    </Layout>
  );
};

export default SignUp;
