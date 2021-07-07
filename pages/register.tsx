import React, {useState} from "react";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import Typography from "../components/Typography";
import FooterForm from "../components/FooterForm";
import {RightSide} from "../styles/Main.module";
import ButtonForm from "../components/Buttons/ButtonForm";
import {Grid, Link, TextField} from "@material-ui/core";
import {Auth} from "aws-amplify";
import Router from "next/router";
import Header from "../components/Header";
import Close from "@material-ui/icons/Close";

interface State {
  username: string;
  password: string;
  email: string;
  gdc_number: string;
  code: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
  user: null;
}

const Register = ({}) => {
  const [values, setValues] = React.useState<State>({
    username: '',
    password: '',
    email: '',
    gdc_number: '',
    code: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    user: null,
  });

  async function signUp(event: { preventDefault: () => void; }) {
    event.preventDefault();
    try {
      const {user} = await Auth.signUp({
        username: values.username,
        password: values.password,
        attributes: {
          email: values.email,
          // gdc_number: values.gdc_number,
        }
      });
      // @ts-ignore
      setValues({...values, user})
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function confirmSignUp(event: { preventDefault: () => void; }) {
    event.preventDefault();
    try {
      await Auth.confirmSignUp(values.username, values.code);
      await Router.replace('/login')
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  return (
    <Layout title="Register page">
      <Header/>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} lg={12}>
          <div className="main bg-login main-height-full">
            <div className="form-login">
              <p className="form-login-title green">Sign Up</p>
              <p className="form-login-subtitle gray">Create An Account with FYD

              </p>
              {
                !values.user &&
                <form onSubmit={signUp}>
                  <p className="form-login-input">
                    <input
                      type="text"
                      name="username"
                      value={values.username}
                      id="username"
                      placeholder="Username"
                      onChange={(e) => setValues({...values, username: e.target.value})}
                    />
                    <Close className="form-login-input-close" onClick={() => setValues({...values, username: ''})}/>
                  </p>
                  <p className="form-login-input">
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      id="email"
                      placeholder="Email"
                      onChange={(e) => setValues({...values, email: e.target.value})}
                    />
                    <Close className="form-login-input-close" onClick={() => setValues({...values, email: ''})}/>
                  </p>
                  <p className="form-login-input">
                    <input
                      type="text"
                      name="gdc_number"
                      value={values.gdc_number}
                      id="gdc_number"
                      placeholder="GDC Number (this cannot be updated later)"
                      onChange={(e) => setValues({...values, gdc_number: e.target.value})}
                    />
                    <Close className="form-login-input-close" onClick={() => setValues({...values, gdc_number: ''})}/>
                  </p>
                  <p className="form-login-input">
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      id="password"
                      placeholder="Password"
                      onChange={(e) => setValues({...values, password: e.target.value})}
                    />
                    <Close className="form-login-input-close" onClick={() => setValues({...values, password: ''})}/>
                  </p>
                  <p className="form-login-buttons">
                    <button type="submit" className="button-green">Sign Up</button>
                  </p>
                </form>
              }{
                values.user &&
                <form onSubmit={confirmSignUp} className="login-form-wrapper">
                  <TextField
                    id="filled-password-input"
                    label="Confirm"
                    type="number"
                    className="input-form"
                    placeholder="confirm"
                    onChange={(e) => setValues({...values, code: e.target.value})}
                    margin="normal"
                    variant="outlined"
                  />
                  <ButtonForm title='Confirm'>Confirm</ButtonForm>
                </form>
              }
            </div>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Register
