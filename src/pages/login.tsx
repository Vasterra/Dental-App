import React, { useEffect } from "react";
import Layout from "src/components/Layout";
import {Grid} from "@material-ui/core";
import Header from "src/components/Header";
import Login from "src/components/login";
import useModal from "src/hooks/useModal";
import { ModalY } from "src/components/Dialog/index";

const SignIn = () => {
  return (
    <Layout title="Login page">
      <Header/>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} lg={12}>
          <Login/>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SignIn;
