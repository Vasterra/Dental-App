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
import {API, Auth, Hub, Storage} from "aws-amplify";
import {getDentist, listDentists, listPractices, listServices} from "../../../graphql/queries";
import {withRouter} from "next/router";
import GalleryComponent from "../../../components/Gallery";

class Account extends Component {

  state: any = {
    dentist: [],
    services: [],
    practices: [],
    currentAvatar: null,
    currentUser: {},
    signedInUser: false,
    isMe: false
  }

  componentDidMount() {
    this.getDentists()
      .then(() => this.downloadImages())
      .then(() => this.downloadAvatar())
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
    this.setState({dentist: data.getDentist})
    this.setState({services: data.getDentist.services.items})
    this.setState({practices: data.getDentist.practices.items})
  }

  async downloadAvatar() {
    try {
      const files =  await Storage.list('avatars/' + this.state.dentist.id + '/')
      let signedFiles = files.map(f => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      this.setState({currentAvatar: signedFiles[0]})
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async downloadImages() {
    try {
      if (this.state.dentist === null) return
      const files = await Storage.list('images/' + this.state.dentist.id + '/')
      let signedFiles = files.map(f => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      let filesList = signedFiles.map(f => {
        return {
          thumbnail: f,
          src: f,
          name: f,
          thumbnailWidth: 320,
          thumbnailHeight: 212,
          isSelected: false
        }
      })
      this.setState({ images: filesList })
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  render() {

    return (
      <Layout title="Account">
        {this.state.dentist && <Box>
            <Header/>
            <FlexWrapper>
              {this.state.isMe && <Drawer/>}
                <MainContainer>
                    <Breadcrumb point="Account"/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} lg={2}>
                          {this.state.dentist && <AvatarProfile
                              dentist={this.state.dentist}
                              currentAvatar={this.state.currentAvatar}
                              downloadAvatar={this.downloadAvatar.bind(this)}
                              signedInUser={this.state.signedInUser}
                              currentUser={this.state.currentUser}
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
                  />}
                  {!this.state.images && <CircularProgressWrapper><CircularProgress/></CircularProgressWrapper>}
                </MainContainer>
            </FlexWrapper>
        </Box>}
        {!this.state.dentist && <>Dentist not found</>}
      </Layout>
    )
  }
}

// @ts-ignore
export default withRouter(Account);
