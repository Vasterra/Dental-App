import React, {Component} from "react";
import Layout from "../Layout";
import {Box, FlexWrapper, FormBlockWrapper, MainContainer, Stripe} from "../../styles/Main.module";
import Header from "../Header";
import Drawer from "../Drawer";
import Breadcrumb from "../Breadcrumb";
import {Grid, Typography} from "@material-ui/core";
import Subscribe from "./ElementsForm";
import {ButtonBigGray} from "../../styles/Button.module";
import Prices from "../Payment/Subscribe/Price";
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";

class CheckoutForm extends Component {
  render() {
    return (
      <AmplifyAuthenticator>
        <Layout title="Profile Subscription">
          <Box>
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
          </Box>
        </Layout>
      </AmplifyAuthenticator>
    );
  }
};

export default CheckoutForm;