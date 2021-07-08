import React from "react";
import Layout from "components/Layout";
import {Grid} from "@material-ui/core";
import Header from "components/Header";
import Registration from "components/registration";

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
