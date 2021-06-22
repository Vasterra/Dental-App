import React, {Component} from "react";
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
import {API, Auth, Hub} from "aws-amplify";
import {getDentist} from "../../../graphql/queries";
import {withRouter} from "next/router";

class Subscription extends Component {

  state: any = {
    dentist: null,
    isMe: false
  }

  async componentDidMount() {
    const {router}: any = this.props
    await this.getDentist(router)
      .then(({data}: any) => {
        this.setState({dentist: data.getDentist})
      })
      .then(() => this.authListener(router))
  }

  async authListener(router) {
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
      this.setState({isMe: currentUser.username === this.state.dentist.id})
      if (!this.state.isMe) return router.push('/dentist/account/' + this.state.dentist.id)
    } catch (err) {
    }
  }

  async getDentist(router) {
    return API.graphql({
      query: getDentist,
      variables: {
        id: router.query.slug[0]
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
  }

  render() {
    return (
      <>
        {this.state.isMe && <Layout title="Profile Subscription">
          {this.state.dentist && <Box>
              <Header/>
              <FlexWrapper>
                  <Drawer/>
                  <MainContainer>
                      <Breadcrumb point="Subscription"/>
                      <FormBlockWrapper>
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
                                      Acknowledge that by deleting my account, my profile and information will be
                                      permanently deleted.
                                  </Typography>
                                  <ButtonBigGray>Permanently delete my account</ButtonBigGray>
                              </Grid>
                              <Grid item xs={12} sm={6} lg={6}>
                                  <Prices/>
                              </Grid>
                          </Grid>
                      </FormBlockWrapper>
                  </MainContainer>
              </FlexWrapper>
          </Box>}
          {!this.state.dentist && <>Dentist not found</>}
        </Layout>}
      </>
    )
  }
}

// @ts-ignore
export default withRouter(Subscription);
