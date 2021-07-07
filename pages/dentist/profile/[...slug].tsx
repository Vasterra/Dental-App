import React, {Component} from "react";
import {Auth, Storage} from "aws-amplify";
import {withRouter} from "next/router";
import Drawer from "../../../components/Drawer";
import Layout from "../../../components/Layout";
import AddSettings from "../../../components/Dentist/profile/settings/AddSettings";
import Location from "../../../components/Dentist/profile/settings/Location";
import Services from "../../../components/Dentist/profile/settings/Services";
import DisplayPhotos from "../../../components/Dentist/profile/settings/DisplayPhotos";
import ApiManager from "../../../services/ApiManager";

class Profile extends Component {

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

  render() {
    return (
      <>
        {this.state.isMe && <Layout title="Profile">
          <Drawer/>
          {this.state.currentDentist &&
          <div className="main-profile bg-white ">
            {this.state.currentDentist && <AddSettings
              currentDentist={this.state.currentDentist}
              getDentist={this.getDentist.bind(this)}
            />}
            {this.state.currentDentist && <Location
              currentDentist={this.state.currentDentist}
              getDentist={this.getDentist.bind(this)}
            />}
            {this.state.currentDentist && <Services
              currentDentist={this.state.currentDentist}
              getDentist={this.getDentist.bind(this)}
            />}
            {this.state.currentDentist && <DisplayPhotos currentDentist={this.state.currentDentist}/>}
          </div>}
          {!this.state.currentDentist && <>Dentist not found</>}
        </Layout>}
      </>
    )
  }
};

// @ts-ignore
export default withRouter(Profile);
