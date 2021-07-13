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
    isMe: false,
    // @ts-ignore
    router: this.props.router
  }

  async componentDidMount() {
    await this.getDentist()
    await this.authListener()
    await this.downloadAvatar()
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
    } catch (err) {
    }
  }

  async getDentist() {
    const currentDentist = await ApiManager.getDentist(this.state.router.query.slug[0]).then(currentDentist => {
      this.setState({currentDentist: currentDentist.getDentist});
    })
  }

  async downloadAvatar() {
    ApiManager.downloadAvatar(this.state.currentDentist).then(signedFiles => {
      this.setState({currentAvatar: signedFiles})
    })
  }

  async downloadImages() {
    ApiManager.downloadImages(this.state.currentDentist).then(filesList => {
      this.setState({images: filesList})
    })
  }

  render() {
    if (!this.state.currentDentist) return <div className="not-found">Dentist not found</div>
    return (
      this.state.currentDentist && <Layout title="Account">
        <div className="main-profile bg-white ">
          <div className="profile-box-form">
            <div className="form-info-block">
              <div>
                <p className="form-login-title green px20">Account Information</p>
                <p className="form-login-subtitle gray px12 mb-6px">Login Details</p>
              </div>
            </div>
            <div className="box-2-box">
              { this.state.currentDentist && <AccountInformation currentDentist={this.state.currentDentist} getDentist={this.getDentist}/> }
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
              { this.state.currentDentist && <BillingInformation currentDentist={this.state.currentDentist} getDentist={this.getDentist}/> }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

// @ts-ignore
export default withRouter(Account);
