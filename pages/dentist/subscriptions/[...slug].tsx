import React, {Component} from "react";
import Header from "../../../components/Header";
import Drawer from "../../../components/Drawer";
import Layout from "../../../components/Layout";
import Subscribe from "../../../components/Stripe/ElementsForm";
import Breadcrumb from "../../../components/Breadcrumb";
import Prices from "../../../components/Payment/Subscribe/Price";
import {Grid, Snackbar, Typography} from "@material-ui/core";

import {FlexWrapper, Box, MainContainer, FormBlockWrapper} from "../../../styles/Main.module";
import {ButtonBigGray} from "../../../styles/Button.module";
import {Stripe} from "../../../styles/Main.module";
import Upgrade from "../../../components/Stripe/upgrade";
import {API, Auth, Hub} from "aws-amplify";
import {getDentist} from "../../../graphql/queries";
import {withRouter} from "next/router";
import Plan from "../../../components/Stripe/Plan";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutFormStripe from "../../../components/Stripe/CheckoutForm";
import {loadStripe} from "@stripe/stripe-js";
import StripeManager from "../../../services/StripeManager";
import { Alert } from "@material-ui/lab";

const stripePromise = loadStripe('pk_test_51J15W0B5Yj7B7VjGcyWF6fMvy3UkvUUS5l6YJ3LQqLGFGZgK7UwNyVHLMMVi2HgDweAsAUxkhuukQBjWlTshTPmu00NmYIp1nd' || '');

class Subscription extends Component {

  state: any = {
    dentist: null,
    currentUser: null,
    currentAvatar: null,
    isMe: false,
    cardInformation: {
      type: '',
      digits: '',
    },
    subscription: {},
    snackbarMessage: '',
    statusSnackbar: '',
    openSnackbar: false
  }

  async componentDidMount() {
    this.getDentists()
      .then(() => this.authListener())
      .then(() => this.fetchCardInformation())
      .then(() => this.fetchSubscription())
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
    this.setState({dentist: data.getDentist})
  }


  async fetchCardInformation() {
    try {
      const info = await StripeManager.retreivePaymentInfo(this.state.dentist.paymentMethodID);
      if (info) {
        this.setState({cardInformation: info});
      }
    } catch (error) {
      console.error(error)
    }
  };

  async fetchSubscription() {
    try {
      const sub = await StripeManager.retrieveSubscription(this.state.dentist.subscriptionID);
      // const ddsdg = await StripeManager.getListSubscriptions(this.state.dentist.customerID)
      // console.log(ddsdg)
      if (sub) {
        this.setState({subscription: sub});
      }

    } catch (error) {
      console.error(error)
    }
  };

  async handleCancelSubscription(e) {
    try {
      const subscription = await StripeManager.handleSubscription(this.state.dentist.subscriptionID, this.state.subscription.cancel_at_period_end);
      this.setState({statusSnackbar: 'success'});
      this.setState({snackbarMessage: 'Subscription cancel'});
      this.setState({openSnackbar: true});
    } catch (error) {
      console.error(error)
      // Let the user know that something went wrong here...
    }
  };

  render() {
    console.log(this.state.subscription)
    const expirationDate = new Date(this.state.subscription.current_period_end * 1000).toDateString();
    const subscriptionWillEnd = this.state.subscription.cancel_at_period_end;

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
                    <Typography variant="body1" gutterBottom>The plan will expire on: {expirationDate}</Typography>
                    <Typography variant="body1" gutterBottom>Card: {this.state.cardInformation.type}</Typography>
                    <Typography variant="body1" gutterBottom>**** **** **** {this.state.cardInformation.digits}</Typography>
                    <Grid container alignItems="center" justify="space-between" spacing={2}>
                      <Grid item xs={12} sm={6} lg={3}>
                        {this.state.dentist && <Upgrade dentist={this.state.dentist}/>}
                      </Grid>
                    </Grid>
                    <ButtonBigGray onClick={this.handleCancelSubscription.bind(this)}>
                      {subscriptionWillEnd ? 'Continue Subscription' : 'Cancel Subscription'}
                    </ButtonBigGray>
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
                    <Prices/>
                  </Grid>
                </Grid>
              </FormBlockWrapper>
            </MainContainer>
          </FlexWrapper>
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.openSnackbar}
          autoHideDuration={2000}
        >
          <Alert
            variant="filled"
            // @ts-ignore
            severity={this.state.statusSnackbar}
          >
            {this.state.snackbarMessage}
          </Alert>
        </Snackbar>
      </Layout>
    );
  }
};

// @ts-ignore
export default withRouter(Subscription);
