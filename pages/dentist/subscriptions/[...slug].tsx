import React from "react";
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

const Subscription = () => {
  return (
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
    </Layout>
  );
};

export default Subscription;
