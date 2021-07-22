import React, {Component} from "react";
import {Auth, Storage} from "aws-amplify";
import {withRouter} from "next/router";
import Error from "next/error";

import Layout from "src/components/Layout";
import AddSettings from "src/components/Dentist/Profile/settings/AddSettings";
import Location from "src/components/Dentist/Profile/settings/Location";
import Services from "src/components/Dentist/Profile/settings/Services";
import DisplayPhotos from "src/components/Dentist/Profile/settings/DisplayPhotos";
import ApiManager from "src/services/ApiManager";
import {CircularProgress} from "@material-ui/core";

// @ts-ignore
import {WrapperFlex} from "src/styles/Main.module"

class Profile extends Component {

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
    } catch (err) {
      console.log(err)
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
      return <Error statusCode={404}/>
    }
  }

  async downloadImages() {
    try {
      ApiManager.downloadImages(this.state.currentDentist).then(filesList => {
        this.setState({images: filesList})
      })
    } catch (e) {
      return <Error statusCode={404}/>
    }
  }

  async uploadAvatar(files: any) {
    files.preventDefault();
    const file = files.target.files[0];
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
    !this.state.currentDentist && <WrapperFlex><CircularProgress size={120}/></WrapperFlex>

    return (
      <>
        {this.state.currentDentist &&
        <Layout title="Profile" active={'activeProfile'} currentAvatar={this.state.currentAvatar}>
            <div className="main-profile bg-white ">
                <AddSettings currentDentist={this.state.currentDentist} getDentist={this.getDentist.bind(this)}/>
                <Location currentDentist={this.state.currentDentist} getDentist={this.getDentist.bind(this)}/>
                <Services currentDentist={this.state.currentDentist} getDentist={this.getDentist.bind(this)}/>
                <DisplayPhotos currentDentist={this.state.currentDentist} currentAvatar={this.state.currentAvatar}
                               uploadAvatar={this.uploadAvatar.bind(this)}/>
            </div>
        </Layout>
        }
      </>
    )
  }
}
;

// @ts-ignore
export default withRouter(Profile);