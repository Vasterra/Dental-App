import React, {Component} from "react";
import {withRouter} from "next/router";
import {Auth} from "aws-amplify";

// @ts-ignore
import {WrapperFlex} from "../../../styles/Main.module"
import Error from "next/error";
import Layout from "components/Layout";
import AccountInformation from "components/Dentist/Account/AccountInformation";
import ResetPassword from "components/Dentist/Account/ResetPassword";
import Mysubscription from "components/Dentist/Account/MySubscription";
import BillingInformation from "components/Dentist/Account/BillingInformation";
import UpgradeToPremium from "components/Dentist/Account/UpgradeToPremium ";

import ApiManager from "services/ApiManager";
import {CircularProgress} from "@material-ui/core";

class Account extends Component {

  state: any = {
    currentDentist: null,
    currentAvatar: null,
    signedInUser: null,
    currentUser: null,
    isMe: false,
    // @ts-ignore
    router: this.props.router
  }

  async componentDidMount() {
    await this.getDentist();
    await this.authListener();
    await this.downloadAvatar();
  }

  async authListener() {
    const signedInUser = ApiManager.authListener()
    this.setState({signedInUser})
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      this.setState({currentUser})
      this.setState({signedInUser: true})
      this.setState({isMe: currentUser.username === this.state.currentDentist.id});
      if (!this.state.isMe) return this.state.router.push('/dentist/account/' + this.state.currentDentist.id)
    } catch (e) {
      console.log(e)
    }
  }

  async getDentist() {
    try {
      const currentDentist = await ApiManager.getDentist(this.state.router.query.slug[0]).then(currentDentist => {
        this.setState({currentDentist: currentDentist});
      })
    } catch (e) {
      return <Error statusCode={404}/>
    }
  }

  async downloadAvatar() {
    try {
      ApiManager.downloadAvatar(this.state.currentDentist).then(signedFiles => {
        this.setState({currentAvatar: signedFiles})
      })
    } catch (e) {
      console.log(e)
    }
  }

  async downloadImages() {
    try {
      ApiManager.downloadImages(this.state.currentDentist).then(filesList => {
        this.setState({images: filesList})
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    if (!this.state.currentDentist) return <WrapperFlex><CircularProgress size={120}/></WrapperFlex>
    return (
      this.state.currentDentist &&
      <Layout title="Account" active={'activeAccount'} currentAvatar={this.state.currentAvatar}>
          <div className="main-profile bg-white ">
              <div className="profile-box-form">
                  <div className="form-info-block">
                      <div>
                          <p className="form-login-title green px20">Account Information</p>
                          <p className="form-login-subtitle gray px12 mb-6px">Login Details</p>
                      </div>
                  </div>
                  <div className="box-2-box">
                    {this.state.currentDentist &&
                    <AccountInformation currentDentist={this.state.currentDentist} getDentist={this.getDentist}/>}
                    {this.state.currentDentist && <ResetPassword/>}
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
                    {!this.state.currentDentist.hasPaidPlan &&
                    <UpgradeToPremium currentDentist={this.state.currentDentist}/>}
                    {this.state.currentDentist.hasPaidPlan &&
                    <Mysubscription currentDentist={this.state.currentDentist}/>}
                    {this.state.currentDentist &&
                    <BillingInformation currentDentist={this.state.currentDentist} getDentist={this.getDentist}/>}
                  </div>
              </div>
          </div>
      </Layout>
    )
  }
}

// @ts-ignore
export default withRouter(Account);
