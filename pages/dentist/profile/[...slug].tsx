import React, {Component} from "react";
import Header from "../../../components/Header";
import Drawer from "../../../components/Drawer";
import Layout from "../../../components/Layout";
import Breadcrumb from "../../../components/Breadcrumb";
import {Grid} from "@material-ui/core";
import AddSettings from "../../../components/Dentist/profile/settings/AddSettings";
import AddWatermark from "../../../components/Dentist/profile/settings/AddWatermark";
import styled from "styled-components";
import AddPractice from "../../../components/Dentist/profile/settings/AddPractice";
import AddService from "../../../components/Dentist/profile/settings/AddService";
import {FlexWrapper, Box, MainContainer, FormBlockWrapper} from "../../../styles/Main.module";
import {API, Auth, Hub, Storage} from "aws-amplify";
import {getDentist} from "../../../graphql/queries";
import {withRouter} from "next/router";

const DentistSettingBlockWrapper = styled("div")`{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
`;

class CardDentist extends Component {

  state: any = {
    dentist: null,
    currentAvatar: null,
    isMe: false
  }

  async componentDidMount() {
    await this.getDentist()
  }

  async authListener() {
    const {router}: any = this.props
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

  async getDentist() {
    const {router}: any = this.props
    const {data}: any = await API.graphql({
      query: getDentist,
      variables: {
        id: router.query.slug[0]
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    this.setState({dentist: data.getDentist})
    await this.authListener()
    await this.downloadAvatar()
  }

  async downloadAvatar() {
    try {
      if (this.state.dentist === null) return
      await Storage.list('avatars/' + this.state.dentist.id + '/')
        .then(result => {
          this.setState({currentAvatar: result})
        })
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  render() {
    return (
      <>
        {this.state.isMe && <Layout title="Profile">
          {this.state.dentist && <Box>
              <Header/>
              <FlexWrapper>
                  <Drawer/>
                  <MainContainer>
                      <Breadcrumb point="Profile"/>
                      <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} lg={6}>
                              <FormBlockWrapper>
                                {this.state.dentist && <AddSettings dentist={this.state.dentist}/>}
                              </FormBlockWrapper>
                          </Grid>
                          <Grid item xs={12} sm={6} lg={6}>
                              <FormBlockWrapper>
                                  <AddWatermark/>
                              </FormBlockWrapper>
                          </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} lg={6}>
                              <FormBlockWrapper>
                                  <Grid container spacing={4}>
                                      <Grid item xs={12} sm={12} lg={6}>
                                          <DentistSettingBlockWrapper>
                                            {this.state.dentist &&
                                            <AddPractice
                                                dentist={this.state.dentist}
                                                getDentist={this.getDentist.bind(this)}
                                            />}
                                          </DentistSettingBlockWrapper>
                                      </Grid>
                                      <Grid item xs={12} sm={12} lg={6}>
                                          <DentistSettingBlockWrapper>
                                            {this.state.dentist &&
                                            <AddService
                                                dentist={this.state.dentist}
                                                getDentist={this.getDentist.bind(this)}
                                            />}
                                          </DentistSettingBlockWrapper>
                                      </Grid>
                                  </Grid>
                              </FormBlockWrapper>
                          </Grid>
                          <Grid item xs={12} sm={6} lg={6}>
                          </Grid>
                      </Grid>
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
export default withRouter(CardDentist);
