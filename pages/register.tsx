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

const Register = ({}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhone_number] = useState('')
  const [code, setCode] = useState('')
  const [user, setUser] = useState(null)

  async function signUp(event) {
    event.preventDefault();
    try {
      const {user} = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number,
        }
      });
      setUser(user)
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function confirmSignUp(event) {
    event.preventDefault();
    try {
      await Auth.confirmSignUp(username, code);
      await Router.replace('/login')
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  return (
    <Layout title="Register page">
      <Grid container justify="center">
        <Grid item sm={6} lg={6}>
          <div className="login-image"/>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <RightSide>
            <Avatar/>
            <Typography title='Login'/>
            {
              !user &&
              <form onSubmit={signUp} className="login-form-wrapper">
                <TextField
                  label="UserName"
                  type="text"
                  className="input-form"
                  id="filled-username-input"
                  placeholder="username"
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
                <TextField
                  id="filled-password-input"
                  label="Email"
                  type="email"
                  className="input-form"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="filled-password-input"
                  label="Phone Number"
                  type="phone"
                  className="input-form"
                  placeholder="phone number"
                  onChange={(e) => setPhone_number(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <ButtonForm title='Sign In'>submit</ButtonForm>
              </form>
            }
            {
              user &&
              <form onSubmit={confirmSignUp} className="login-form-wrapper">
                <TextField
                  id="filled-password-input"
                  label="Confirm"
                  type="number"
                  className="input-form"
                  placeholder="confirm"
                  onChange={(e) => setCode(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <ButtonForm title='Confirm'>Confirm</ButtonForm>
              </form>
            }
            <Link href={"../login"}>Login your Dental account</Link>
            <Link href={"../search"}>Go to search Dentist</Link>
            <FooterForm/>
          </RightSide>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Register
