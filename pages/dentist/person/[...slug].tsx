import React, {Component} from "react";
import {API, Auth, Hub, Storage} from "aws-amplify";
import {withRouter} from "next/router";
import ApiManager from "../../../services/ApiManager";
import ProfileAccountFree from "components/Dentist/PersonPage/profileAccountFree";
import ProfileAccountSubscription from "components/Dentist/PersonPage/profileAccountSubscription";
import Header from "components/Header";
import {listImages, listServiceForDentals} from "graphql/queries";
import {CircularProgress} from "@material-ui/core";

// @ts-ignore
import {WrapperFlex} from "../../../styles/Main.module"
import Layout from "components/Layout";

class Person extends Component {

  state: any = {
    currentDentist: null,
    currentAvatar: null,
    signedInUser: null,
    currentUser: null,
    services: null,
    images: null,
    oldIMages: null,
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
    } catch (err) {
    }
  }

  async getDentist() {
    const {router}: any = this.props
    const currentDentist = await ApiManager.getDentist(router.query.slug[0]);
    this.setState({currentDentist: currentDentist});
    await this.authListener()
    await this.getListImages()
    await this.downloadAvatar();
    await this.downloadImages();
    await this.getListServiceForDentals();
  }

  async downloadAvatar() {
    if (this.state.currentDentist === null) return
    try {
      const files = await Storage.list('avatars/' + this.state.currentDentist.id + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      this.setState({currentAvatar: signedFiles[signedFiles.length - 1]})
    } catch (error) {
      console.log('Error download Avatar file: ', error);
    }
  }

  setImages(images: any) {
    this.setState({images: images})
  }

  async getListImages() {
    const {data}: any = await API.graphql({
      query: listImages,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    this.setState({listImages: data.listImages.items})
  }

  async getListServiceForDentals() {
    const {data}: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    this.setState({services: data.listServiceForDentals.items})
  }


  async downloadImages() {
    try {
      if (this.state.currentDentist === null) return
      if (this.state.listImages === undefined) return

      const listImagesFilter = this.state.listImages.filter((el: { dentistId: any; }) => el.dentistId === this.state.currentDentist.id);

      let eachImages: any[] = []
      listImagesFilter && listImagesFilter.forEach(async (e: any) => {
        const files = await Storage.list('images/' + this.state.currentDentist.id + '/' + e.id)
        let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
        signedFiles = await Promise.all(signedFiles)
        let filesList = signedFiles.map((f: any, key: string | number) => {
          return {
            thumbnail: f,
            url: f,
            name: files[key].key,
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            isSelected: false,
            titleBefore: e.titleBefore,
            tagsBefore: e.titleBefore,
            titleAfter: e.titleAfter,
            tagsAfter: e.tagsAfter,
            service: e.service
          }
        })
        eachImages.push(filesList)
        this.setState({images: eachImages})
        this.setState({oldIMages: eachImages})
      })
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  render() {
    return (
      <Layout title="Person" active={'activePerson'} currentAvatar={this.state.currentAvatar}>
        <Header/>
        if (!this.state.currentDentist) return <WrapperFlex><CircularProgress size={120}/></WrapperFlex>
        { this.state.currentDentist && !this.state.currentDentist.hasPaidPlan && <ProfileAccountFree
            currentDentist={this.state.currentDentist}
            images={this.state.images}
            oldIMages={this.state.oldIMages}
            services={this.state.services}
            currentAvatar={this.state.currentAvatar}
            setImages={this.setImages.bind(this)}
            downloadImages={this.downloadImages.bind(this)}
          />
        }
        { this.state.currentDentist && this.state.currentDentist.hasPaidPlan && <ProfileAccountSubscription
            currentDentist={this.state.currentDentist}
            images={this.state.images}
            oldIMages={this.state.oldIMages}
            services={this.state.services}
            currentAvatar={this.state.currentAvatar}
            setImages={this.setImages.bind(this)}
            downloadImages={this.downloadImages.bind(this)}
        />
        }
      </Layout>
    )
  }
}

// @ts-ignore
export default withRouter(Person);
