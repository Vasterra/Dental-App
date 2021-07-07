import React, {Component} from "react";
import {withRouter} from "next/router";
import {Auth, Hub, Storage} from "aws-amplify";
import Layout from "components/Layout";
import Drawer from "components/Drawer";
import AccountInformation from "components/Dentist/AccountInformation";
import ResetPassword from "components/Dentist/ResetPassword";
import BillingInformation from "components/Dentist/BillingInformation";
import UpgradeToPremium from "components/Dentist/UpgradeToPremium ";
import ApiManager from "services/ApiManager";

class Account extends Component {

  state: any = {
    currentDentist: null,
    currentAvatar: null,
    signedInUser: null,
    currentUser: null,
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
      const currentUser = await Auth.currentAuthenticatedUser();
      this.setState({currentUser})
      this.setState({signedInUser: true})
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
    if (this.state.currentDentist === null) return
    try {
      const files = await Storage.list('avatars/' + this.state.currentDentist.id + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      console.log(signedFiles)
      this.setState({currentAvatar: signedFiles[signedFiles.length - 1]})
    } catch (error) {
      console.log('Error download Avatar file: ', error);
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
      this.setState({images: filesList})
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  render() {
    return (
      <>
        {this.state.isMe && <Layout title="Account">
          {this.state.isMe && <Drawer
            currentAvatar={this.state.currentAvatar}
            currentDentist={this.state.currentDentist}
            currentUser={this.state.currentUser}
            signedInUser={this.state.signedInUser}
          />}
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
                <ResetPassword/>
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
                <UpgradeToPremium/>
                <BillingInformation currentDentist={this.state.currentDentist} getDentist={this.getDentist}/>
              </div>
            </div>
          </div>}
          {!this.state.currentDentist && <>Dentist not found</>}
        </Layout>}
      </>
    )
  }
}

// @ts-ignore
export default withRouter(Account);
