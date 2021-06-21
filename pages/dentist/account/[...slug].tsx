import * as React from "react";
import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import Drawer from "../../../components/Drawer";
import Breadcrumb from "../../../components/Breadcrumb";
import AvatarProfile from "../../../components/Dentist/Avatar";
import DentistProfileInfo from "../../../components/Dentist/Info";
import Services from "../../../components/Dentist/Services";
import Practises from "../../../components/Dentist/Practices";
import {Component, useState} from "react";
import {CircularProgress, Grid} from "@material-ui/core";
import {FlexWrapper, Box, MainContainer, CircularProgressWrapper} from "../../../styles/Main.module";
import {API, Auth, Storage} from "aws-amplify";
import {listDentists, listPractices, listServices} from "../../../graphql/queries";
import {withRouter} from "next/router";
import GalleryComponent from "../../../components/Gallery";

class Account extends Component {

  state: any = {
    dentist: [],
    services: [],
    practices: [],
    currentAvatar: [],
  }

  componentDidMount() {
    this.getDentists()
      .then(() => this.downloadImages())
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
    console.log(currentDentist)
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

  async downloadImages() {
    try {
      await Storage.list('images/' + this.state.dentist.sub  + '/')
        .then(result => {
          console.log(result)
          let filesList = [];

          if (result !== undefined) {
            result.forEach((file, key) => {
              filesList.push({
                thumbnail: file.key,
                src: file.key,
                name: file.key,
                thumbnailWidth: 320,
                thumbnailHeight: 212,
                isSelected: false
              });
            });
          }
          console.log(filesList)
          this.setState({images: filesList})
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
              <Breadcrumb point="Account"/>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} lg={2}>
                  {this.state.dentist && <AvatarProfile
                    dentist={this.state.dentist}
                    currentAvatar={this.state.currentAvatar}
                    downloadAvatar={this.downloadAvatar}
                  />}
                </Grid>
                <Grid item xs={12} sm={8} lg={5}>
                  {this.state.dentist && <DentistProfileInfo dentist={this.state.dentist}/>}
                </Grid>
                <Grid item xs={12} sm={6} lg={2}>
                  {this.state.services && <Services services={this.state.services}/>}
                </Grid>
                <Grid item xs={12} sm={6} lg={2}>
                  {this.state.practices && <Practises practices={this.state.practices}/>}
                </Grid>
              </Grid>
              {this.state.images && <GalleryComponent
                images={this.state.images}
                downloadImages={this.downloadImages}
              /> }
              {!this.state.images && <CircularProgressWrapper><CircularProgress/></CircularProgressWrapper>}
            </MainContainer>
          </FlexWrapper>
        </Box>
      </Layout>
    )
  }
}

// @ts-ignore
export default withRouter(Account);
