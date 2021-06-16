import React, {useEffect, useState} from "react";
import Avatar from "../components/Avatar";
import Typography from "../components/Typography";
import FooterForm from "../components/FooterForm";
import {RightSide} from "../styles/Main.module";
import Layout from "../components/Layout";
import {Grid, TextField} from "@material-ui/core";
import {Auth} from "aws-amplify";
import ButtonForm from "../components/Buttons/ButtonForm";
import Router from "next/router";

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  async function signIn(event) {
    event.preventDefault();
    try {
      const user = await Auth.signIn(username, password);
      setUser(user)
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  if (user) Router.replace('/')

  return (
    <Layout title="Login page">
      <Grid container justify="center">
        <Grid item sm={6} lg={6}>
          <div className="login-image" />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <RightSide>
            <Avatar/>
            <Typography title='Login'/>
            <form onSubmit={signIn} className="login-form-wrapper">
              <TextField
                label="Email"
                type="text"
                className="input-form"
                id="filled-email-input"
                placeholder="email"
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                className="input-form"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <ButtonForm title='Sign In'>Submit</ButtonForm>
            </form>
            <FooterForm/>
          </RightSide>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
