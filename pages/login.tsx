import React from "react";
import Layout from "components/Layout";
import Header from "components/Header";
import Register from "components/register";
import Login from "components/login";

const Auth = () => {
  return (
    <Layout title="Singup">
      <section className="container-vh">
        <Header/>
        <div className="box-to-box">
          <Login/>
          <Register/>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;

