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
import {API, Storage} from "aws-amplify";
import {listDentists, listPractices, listServices} from "../../../graphql/queries";
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
    services: null,
    practices: null,
    currentAvatar: null,
  }

  componentDidMount() {
    this.getDentists()
      .then(() => this.downloadAvatar())
      .then(() => this.getPractices())
      .then(() => this.getServices())
  }

  async getDentists() {
    const {router}: any = this.props
    const dentists: any = await API.graphql({
      query: listDentists,
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    const currentDentist = dentists.data.listDentists.items.find(dentist => router.query.slug[0] == dentist.sub)
    this.setState({dentist: currentDentist})
  }

  async getPractices() {
    const practices: any = await API.graphql({
      query: listPractices,
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    this.setState({practices: practices.data.listPractices.items})
  }

  async getServices() {
    const services: any = await API.graphql({
      query: listServices,
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    this.setState({services: services.data.listServices.items})
  }

  async downloadAvatar() {
    try {
      await Storage.list('avatars/' + this.state.dentist.sub + '/')
        .then(result => {
          this.setState({currentAvatar: result})
        })
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  render() {
    return (
      <Layout title="Profile">
        <Box>
          <Header/>
          <FlexWrapper>
            <Drawer/>
            <MainContainer>
              <Breadcrumb point="Profile"/>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={6}>
                  <FormBlockWrapper>
                    {this.state.dentist && <AddSettings dentist={this.state.dentist}/> }
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
                          {this.state.practices && <AddPractice practices={this.state.practices} getPractices={this.getPractices.bind(this)}/> }
                        </DentistSettingBlockWrapper>
                      </Grid>
                      <Grid item xs={12} sm={12} lg={6}>
                        <DentistSettingBlockWrapper>
                          {this.state.services && <AddService services={this.state.services} getServices={this.getServices.bind(this)}/> }
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
        </Box>
      </Layout>
    );
  }
}

// @ts-ignore
export default withRouter(CardDentist);
