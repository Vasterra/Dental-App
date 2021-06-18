import * as React from "react";
import {useGetIntId} from "../../../utils/useGetIntId";
import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import Drawer from "../../../components/Drawer";
import GalleryComponent from "../../../components/Gallery";
import Breadcrumb from "../../../components/Breadcrumb";
import AvatarProfile from "../../../components/Dentist/Avatar";
import DentistProfileInfo from "../../../components/Dentist/Info";
import Services from "../../../components/Dentist/Services";
import Practises from "../../../components/Dentist/Practises";
import {Component, useState} from "react";
import {Grid} from "@material-ui/core";

import {FlexWrapper, Box, MainContainer} from "../../../styles/Main.module";
import {convertCityCoords} from "../../../utils/search/converCityCoords";
import {API, Auth} from "aws-amplify";
import {listDentists, listPractices, listServices} from "../../../graphql/queries";
import {withRouter} from "next/router";
import {PhotoPicker} from "aws-amplify-react";

class Account extends Component {

  state: any = {
    dentist: [],
    services: [],
    practices: [],
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    const dentists: any = await API.graphql({query: listDentists})

    const services: any = await API.graphql({query: listServices})
    this.setState({services: services.data.listServices.items})

    const practices: any = await API.graphql({query: listPractices})
    this.setState({practices: practices.data.listPractices.items})

    const currentDentist = dentists.data.listDentists.items.find(item => item.email === user.attributes.email)
    this.setState({dentist: currentDentist})
  }


  // const [images, setImages] = useState([]);
  // const URL: string = "http://localhost:4000/files/" + intId

  // const getImages = async () => {
  //   const requestOptions: {} = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
  //
  //   await fetch(URL, requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       setImages(result)
  //     })
  //     .catch((_error: any) => {
  //     })
  // }
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
                  <AvatarProfile dentist={this.state.dentist}/>
                </Grid>
                <Grid item xs={12} sm={8} lg={4}>
                  <DentistProfileInfo data={this.state.dentist}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Services services={this.state.services}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Practises practices={this.state.practices}/>
                </Grid>
              </Grid>
              <GalleryComponent />
            </MainContainer>
          </FlexWrapper>
        </Box>
      </Layout>
    )
  }
}

// @ts-ignore
export default withRouter(Account);
