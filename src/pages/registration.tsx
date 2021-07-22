import React from "react";
import Layout from "src/components/Layout";
import {Grid} from "@material-ui/core";
import Header from "src/components/Header";
import Registration from "src/components/registration";

const SignUp = () => {

  return (
    <Layout title="Register page">
      <Header/>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} lg={12}>
          <Registration />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SignUp;
