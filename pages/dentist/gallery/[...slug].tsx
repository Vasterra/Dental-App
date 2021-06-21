import React, {Component, useState} from "react";
import Drawer from "../../../components/Drawer";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import {InputSearch} from "../../../styles/Search.module";
import {CircularProgress, Grid, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DownloadDropzone from "../../../components/Gallery/DownloadDropzone";
import DeleteFile from "../../../components/Gallery/DeleteFile";
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
import {API, Storage} from "aws-amplify";
import {listDentists} from "../../../graphql/queries";
import {withRouter} from "next/router";

class Gallery extends Component {

  state: any = {
    dentist: [],
    services: [],
    practices: [],
    currentAvatar: null,
    images: null
  }

  async componentDidMount() {
    this.getDentists()
      .then(() => this.downloadImages())
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
      <Layout title="Profile Gallery">
        <Box>
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
                        {/*<DeleteFile*/}
                        {/*  // @ts-ignore*/}
                        {/*  me={intId} deleteImage={deleteImage} getImages={getImages}/>*/}
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
                  downloadImages={this.downloadImages.bind(this)}
              />}
              {!this.state.images && <CircularProgressWrapper><CircularProgress/></CircularProgressWrapper>}
            </MainContainer>
          </FlexWrapper>
        </Box>
      </Layout>
    );
  }
}

//@ts-ignore
export default withRouter(Gallery)
