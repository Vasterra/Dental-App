import React, {useState} from "react";
import Avatar from "../components/Avatar";
import Typography from "../components/Typography";
import FooterForm from "../components/FooterForm";
import {RightSide} from "../styles/Main.module";
import Layout from "../components/Layout";
import {Grid, Link, TextField} from "@material-ui/core";
import {API, Auth} from "aws-amplify";
import ButtonForm from "../components/Buttons/ButtonForm";
import Router from "next/router";
import {createDentist} from "../graphql/mutations";
import {listDentists} from "../graphql/queries";
import {convertCityCoords} from "../utils/search/converCityCoords";

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  async function signIn(event) {
    event.preventDefault();
    try {
      const user = await Auth.signIn(username, password);
      setUser(user)

      const dentists: any = await API.graphql({
        query: listDentists,
        // @ts-ignore
        authMode: 'AWS_IAM'
      })
      const dentistEmail = dentists.data.listDentists.items.find(item => item.email === user.attributes.email)
      if (dentists.data.listDentists.items.length !== 0) {
        if (!dentistEmail) {
          await createNewDentist(user);
        }
      } else {
        await createNewDentist(user);
      }
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async function createNewDentist(user) {
    await convertCityCoords().then(async (result) => {
      console.log(result)
      await API.graphql({
        query: createDentist,
        variables: {
          input: {
            id: user.username,
            email: user.attributes.email,
            lat: result.lat,
            lng: result.lng,
            firstName: username,
            registered: true,
            phone: user.attributes.phone_number,
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      })
      await Router.replace('/search')
    })

  }

  if (user) Router.replace('/')

  return (
    <Layout title="Login page">
      <Grid container justify="center">
        <Grid item sm={6} lg={6}>
          <div className="login-image"/>
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
            <Link href={"../register"}>Create your Dental account</Link>
            <Link href={"../search"}>Go to search Dentist</Link>
            <FooterForm/>
          </RightSide>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
