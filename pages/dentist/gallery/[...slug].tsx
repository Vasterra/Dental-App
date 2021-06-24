import React, {Component, useState} from "react";
import Drawer from "../../../components/Drawer";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import {InputSearch} from "../../../styles/Search.module";
import {CircularProgress, Grid, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DownloadDropzone from "../../../components/Gallery/DownloadDropzone";
import {getDentist} from "../../../graphql/queries";
import Breadcrumb from "../../../components/Breadcrumb";
import GalleryComponent from "../../../components/Gallery";
import {
  FlexWrapper,
  Box,
  MainContainer,
  FormBlockWrapper,
  Search,
  CircularProgressWrapper
} from "../../../styles/Main.module";
import {API, Auth, Hub, Storage} from "aws-amplify";
import {withRouter} from "next/router";
import DeleteFile from "../../../components/Gallery/DeleteFile";

class Gallery extends Component {

  state: any = {
    dentist: [],
    images: null,
    deleteImage: null
  }

  async componentDidMount() {
    const {router}: any = this.props
    await this.getDentist(router)
      .then(({data}: any) => {
        this.setState({dentist: data.getDentist})
      })
      .then(() => this.authListener(router))
      .then(() => this.downloadImages())
  }

  setDeleteImage(selectImages) {
    this.setState({deleteImage: selectImages})
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

  async downloadImages() {
    try {
      if (this.state.dentist === null) return
      const files = await Storage.list('images/' + this.state.dentist.id + '/')
      let signedFiles = files.map(f => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      console.log('signedFiles: ', signedFiles)
      let filesList = signedFiles.map((f, key) => {
        return {
          thumbnail: f,
          src: f,
          name: files[key].key,
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
      <>
        {this.state.isMe && <Layout title="Profile Gallery">
          {this.state.dentist && <Box>
              <Header/>
              <FlexWrapper>
                  <Drawer/>
                  <MainContainer>
                      <Breadcrumb point="Gallery"/>
                      <FormBlockWrapper>
                          <Grid container alignItems="center" justify="space-between" spacing={1}>
                              <Grid item xs={12} sm={6} lg={6}>
                                  <Grid container alignItems="center" justify="space-between">
                                      <Grid item xs={12} sm={10} lg={6}>
                                          <Search>
                                              <IconButton type="submit" aria-label="search"
                                                          style={{width: '45px', height: '45px', color: '#0d9da6'}}>
                                                  <SearchIcon/>
                                              </IconButton>
                                              <InputSearch
                                                  style={{width: '70%', background: 'transparent'}}
                                                  placeholder="Search Images by title"
                                              />
                                          </Search>
                                      </Grid>
                                  </Grid>
                              </Grid>
                              <Grid item xs={12} sm={6} lg={6}>
                                  <Grid container alignItems="center" justify="flex-end" spacing={1}>
                                      <Grid item xs={12} sm={5} lg={4}>
                                        <DeleteFile
                                          // @ts-ignore
                                          deleteImage={this.state.deleteImage} getImages={this.downloadImages.bind(this)}/>
                                      </Grid>
                                      <Grid item xs={12} sm={5} lg={4}>
                                          <DownloadDropzone
                                              dentist={this.state.dentist}
                                              downloadImages={this.downloadImages.bind(this)}
                                          />
                                      </Grid>
                                  </Grid>
                              </Grid>
                          </Grid>
                      </FormBlockWrapper>
                    {this.state.images &&
                    <GalleryComponent
                        images={this.state.images}
                        setDeleteImage={this.setDeleteImage.bind(this)}
                    />}
                    {!this.state.images && <CircularProgressWrapper><CircularProgress/></CircularProgressWrapper>}
                  </MainContainer>
              </FlexWrapper>
          </Box>}
          {!this.state.dentist && <>Dentist not found</>}
        </Layout>}
      </>
    );
  }

}

//@ts-ignore
export default withRouter(Gallery)
