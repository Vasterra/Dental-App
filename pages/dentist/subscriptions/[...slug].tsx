import React, { Component } from "react";
import Header from "../../../components/Header";
import Drawer from "../../../components/Drawer";
import Layout from "../../../components/Layout";
import Subscribe from "../../../components/Stripe/ElementsForm";
import Breadcrumb from "../../../components/Breadcrumb";
import Prices from "../../../components/Payment/Subscribe/Price";
import {Grid, Typography} from "@material-ui/core";

import {FlexWrapper, Box, MainContainer, FormBlockWrapper} from "../../../styles/Main.module";
import {ButtonBigGray} from "../../../styles/Button.module";
import {Stripe} from "../../../styles/Main.module";
import Upgrade from "../../../components/Stripe/upgrade";
import {API, Auth, Hub } from "aws-amplify";
import { getDentist } from "../../../graphql/queries";
import { withRouter } from "next/router";
import Plan from "../../../components/Stripe/Plan";

class Subscription extends Component {

  state: any = {
    dentist: null,
    currentUser: null,
    currentAvatar: null,
    isMe: false
  }

  componentDidMount() {
    this.getDentists()
      .then(() => this.authListener())
  }

  async authListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return this.setState({signedInUser: true})
        case 'signOut':
          return this.setState({signedInUser: false})
      }
    })
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      this.setState({currentUser: currentUser})
      this.setState({signedInUser: true})
      this.setState({isMe: currentUser.username === this.state.dentist.id})
    } catch (err) {
    }
  }

  async getDentists() {
    const {router}: any = this.props
    const {data}: any = await API.graphql({
      query: getDentist,
      variables: {
        id: router.query.slug[0]
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    console.log(data.getDentist)
    this.setState({dentist: data.getDentist})
  }

  render() {

    return (
      <Layout title="Profile Subscription">
        <Box>
          <Header/>
          <FlexWrapper>
            <Drawer/>
            <MainContainer>
              <Breadcrumb point="Subscription"/>
              <FormBlockWrapper>
                {/*{ this.state.dentist && <Plan dentist={this.state.dentist}/> }*/}
                <Grid container justify="center" spacing={4}>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Typography variant="h6" gutterBottom>
                      Subscriptions
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <p>Subscription Status: Active</p>
                      <p>Subscription Renewal: 22/12/2021</p>
                    </Typography>
                    <Grid container alignItems="center" justify="space-between" spacing={2}>
                      <Grid item xs={12} sm={6} lg={3}>
                        <Subscribe/>
                      </Grid>
                    </Grid>
                    <ButtonBigGray>Cancel Subscription</ButtonBigGray>
                    <Stripe/>
                    <Typography variant="h6" gutterBottom>
                      Delete Account
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Acknowledge that by deleting my account, my profile and information will be permanently deleted.
                    </Typography>
                    <ButtonBigGray>Permanently delete my account</ButtonBigGray>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    { this.state.dentist && <Upgrade dentist={this.state.dentist}/> }
                    <Prices/>
                  </Grid>
                </Grid>
              </FormBlockWrapper>
            </MainContainer>
          </FlexWrapper>
        </Box>
      </Layout>
    );
  }
};

// @ts-ignore
export default withRouter(Subscription);
