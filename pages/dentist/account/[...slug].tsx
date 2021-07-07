import * as React from "react";
import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import Drawer from "../../../components/Drawer";
import Breadcrumb from "../../../components/Breadcrumb";
import AvatarProfile from "../../../components/Dentist/Avatar";
import DentistProfileInfo from "../../../components/Dentist/Info";
import Services from "../../../components/Dentist/Services";
// import Practises from "../../../components/Dentist/Practices";
import {Component, useState} from "react";
import {CircularProgress, Grid} from "@material-ui/core";
import {FlexWrapper, Box, MainContainer, CircularProgressWrapper} from "../../../styles/Main.module";
import {API, Auth, Hub, Storage} from "aws-amplify";
import {getDentist, listDentists, listServices} from "../../../graphql/queries";
import {withRouter} from "next/router";
import GalleryComponent from "../../../components/Gallery";
import ApiManager from "../../../services/ApiManager";
import AccountInformation from "../../../components/Dentist/AccountInformation";
import ResetPassword from "../../../components/Dentist/ResetPassword";
import BillingInformation from "components/Dentist/BillingInformation";
import UpgradeToPremium from "components/Dentist/UpgradeToPremium ";

class Account extends Component {

  state: any = {
    currentDentist: null,
    currentAvatar: null,
    signedInUser: null,
    isMe: false
  }

  async componentDidMount() {
    await this.getDentist()
  }

  async authListener() {
    const {router}: any = this.props
    ApiManager.authListener()
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      this.setState({isMe: currentUser.username === this.state.currentDentist.id});
      if (!this.state.isMe) return router.push('/dentist/account/' + this.state.currentDentist.id)
    } catch (err) {
    }
  }

  async getDentist() {
    const {router}: any = this.props
    const currentDentist = await ApiManager.getDentist(router.query.slug[0]);
    this.setState({currentDentist: currentDentist.getDentist});
    await this.authListener()
    await this.downloadAvatar()
  }

  async downloadAvatar() {
    try {
      if (this.state.currentDentist === null) return
      await Storage.list('avatars/' + this.state.currentDentist.id + '/')
        .then(result => {
          this.setState({currentAvatar: result})
        })
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async downloadImages() {
    try {
      if (this.state.dentist === null) return
      const files = await Storage.list('images/' + this.state.dentist.id + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      let filesList = signedFiles.map((f: any) => {
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
      <>
        {this.state.isMe && <Layout title="Profile">
          <Drawer/>
          {this.state.currentDentist &&
          <div className="main-profile bg-white ">
            <div className="profile-box-form">
              <div className="form-info-block">
                <div>
                  <p className="form-login-title green px20">Account Information</p>
                  <p className="form-login-subtitle gray px12 mb-6px">Login Details</p>
                </div>
              </div>
              <div className="box-2-box">
                <AccountInformation currentDentist={this.state.currentDentist} getDentist={this.getDentist}/>
                <ResetPassword currentDentist={this.state.currentDentist} getDentist={this.getDentist}/>
              </div>
            </div>
            <div className="profile-box-form">
              <div className="form-info-block">
                <div>
                  <p className="form-login-title green px20">Upgrade to Premium</p>
                  <p className="form-login-subtitle gray px12 ">Paid Subscription</p>
                </div>
              </div>
              <div className="box-2-box">
                <UpgradeToPremium />
                <BillingInformation currentDentist={this.state.currentDentist} getDentist={this.getDentist}/>
              </div>
            </div>
            {/*<AddWatermark/>*/}

            {/*{this.state.dentist &&*/}
            {/*<AddPractice*/}
            {/*  dentist={this.state.dentist}*/}
            {/*  getDentist={this.getDentist.bind(this)}*/}
            {/*/>}*/}
            {/*{this.state.dentist &&*/}
            {/*<AddService*/}
            {/*  dentist={this.state.dentist}*/}
            {/*  getDentist={this.getDentist.bind(this)}*/}
            {/*/>}*/}
          </div>}
          {!this.state.currentDentist && <>Dentist not found</>}
        </Layout>}
      </>
      // <Layout title="Account">
      //   {this.state.dentist && <Box>
      //       <Header/>
      //       <FlexWrapper>
      //         {this.state.isMe && <Drawer/>}
      //           <MainContainer>
      //               <Breadcrumb point="Account"/>
      //               <Grid container spacing={2}>
      //                   <Grid item xs={12} sm={4} lg={2}>
      //                     {this.state.dentist && <AvatarProfile
      //                         dentist={this.state.dentist}
      //                         currentAvatar={this.state.currentAvatar}
      //                         downloadAvatar={this.downloadAvatar.bind(this)}
      //                         signedInUser={this.state.signedInUser}
      //                         currentUser={this.state.currentUser}
      //                     />}
      //                   </Grid>
      //                   <Grid item xs={12} sm={8} lg={5}>
      //                     {this.state.dentist && <DentistProfileInfo dentist={this.state.dentist}/>}
      //                   </Grid>
      //                   <Grid item xs={12} sm={6} lg={2}>
      //                     {this.state.services && <Services services={this.state.services}/>}
      //                   </Grid>
      //                   <Grid item xs={12} sm={6} lg={2}>
      //                     {this.state.practices && <Practises practices={this.state.practices}/>}
      //                   </Grid>
      //               </Grid>
      //             {this.state.images && <GalleryComponent
      //                 images={this.state.images}
      //             />}
      //             {!this.state.images && <CircularProgressWrapper><CircularProgress/></CircularProgressWrapper>}
      //           </MainContainer>
      //       </FlexWrapper>
      //   </Box>}
      //   {!this.state.dentist && <>Dentist not found</>}
      // </Layout>
    )
  }
};

// @ts-ignore
export default withRouter(Account);
