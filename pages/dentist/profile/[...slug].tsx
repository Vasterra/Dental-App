import React, {Component} from "react";
import {Auth, Hub, Storage} from "aws-amplify";
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
    const currentDentist = await ApiManager.getDentist(router.query.slug[0]).then(currentDentist => {
      this.setState({currentDentist: currentDentist});
    })
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

  async uploadAvatar(files: any) {
    files.preventDefault();
    const file = files.target.files[0];
    console.log(file)
    const filename = file.name.split('.')
    try {
      await Storage.put('avatars/' + this.state.currentDentist.id + '/' + 'avatar.' + filename[filename.length - 1], file, {
        level: 'public',
        contentType: 'image/png',
      }).then(async (result: any) => {
        let signedFiles: any = Storage.get(result.key)
        signedFiles = await signedFiles.then((item: any) => {
          return item
        })
        this.setState({setCurrentAvatar: signedFiles})
        this.downloadAvatar()
        // setDownloadMessage('Success!')
        // setStatusSnackbar('success')
        // setOpenSnackbar(true)
        // setOpen(false)
      })
        .catch((_error: any) => {
          // setDownloadMessage('File upload error')
          // setStatusSnackbar('error')
          // setOpenSnackbar(true)
        });
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  render() {
    if (!this.state.currentDentist) return <div className="not-found">Dentist not found</div>
    return (
      <Layout title="Profile">
        <Drawer />
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
          {this.state.currentDentist && <DisplayPhotos
              currentDentist={this.state.currentDentist}
              currentAvatar={this.state.currentAvatar}
              uploadAvatar={this.uploadAvatar.bind(this)}
          />}
        </div>
      </Layout>
    )
  }
};

// @ts-ignore
export default withRouter(Profile);
