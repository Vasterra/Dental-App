import React, {Component} from "react";
import {withRouter} from "next/router";
import { v4 as uuidv4 } from 'uuid';
import Layout from "../../../components/Layout";
import {Auth, Hub, Storage} from "aws-amplify";
import ApiManager from "services/ApiManager";
import Drawer from "components/Drawer";
import UploadImage from "components/Gallery/UploadImage";

class Gallery extends Component {

  state: any = {
    images: null,
    deleteImage: null,
    currentDentist: null,
    currentAvatar: null,
    signedInUser: null,
    currentUser: null,
    isMe: false,
    uuid: null
  }

  async componentDidMount() {
    await this.getDentist()
  }

  generateUUID() {
    this.setState({uuid: uuidv4()})
    console.log(uuidv4())
  }

  setDeleteImage(selectImages: any) {
    this.setState({deleteImage: selectImages})
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
    await this.authListener();
    await this.downloadImages();
    await this.downloadAvatar();
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
      if (this.state.currentDentist === null) return
      const files = await Storage.list('images/' + this.state.currentDentist.id + '/' + this.state.uuid + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      let filesList = signedFiles.map((f: any, key: string | number) => {
        return {
          thumbnail: f,
          src: f,
          name: files[key].key,
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
    if (!this.state.currentDentist) return <div className="not-found">Dentist not found</div>
    return (
      <Layout title="Gallery">
        <div className="main-profile bg-white ">
          <div className="row-gallery">
            <div className="profile-box-form cut-block">
              <div className="form-info-block one-block">
                <div>
                  <p className="form-login-title green px20">Upload Before Image</p>
                  <p className="form-login-subtitle gray px12 mb-6px">Add and edit your images</p>
                </div>
              </div>
              <div className="profile-block-box">
                <div className="gallery-block-image">
                  <p className="form-login-buttons gallery-preview">
                    <button className="button-green">Crop</button>
                  </p>
                  <img className="delete-button" src="../../../public/images/delete_forever.svg"
                       alt="delete"/>
                </div>
                <div>
                  <p className="form-profile-label">Title</p>
                  <p>
                    <input className="form-profile-input" type="text" name="title" id="title" value="" placeholder="Image Title"/>
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">Alt Tags</p>
                  <p>
                    <input className="form-profile-input" type="text" name="tags" id="tags" value="" placeholder="Alt Tag"/>
                  </p>
                </div>
              </div>
            </div>
            <div className="profile-box-form cut-block">
              <div className="form-info-block one-block">
                <div>
                  <p className="form-login-title green px20">Upload After Image</p>
                  <p className="form-login-subtitle gray px12 mb-6px">Add and edit your images</p>
                </div>
              </div>
              <div className="profile-block-box">
                {/*<div className="gallery-block-image">*/}
                {/*  <p className="gallery-upload">*/}
                {/*    <label className="button-green-file">Upload</label>*/}
                {/*    <input type="file" className="input-file" name="cover_image" id="cover_image"/>*/}
                {/*    <span className="upload-subtitle">Max Size 2MB</span>*/}
                {/*  </p>*/}
                {/*</div>*/}
                <UploadImage />
                <div>
                  <p className="form-profile-label">Title</p>
                  <p>
                    <input className="form-profile-input" type="text" name="title" id="title" value="" placeholder="Image Title"/>
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">Alt Tags</p>
                  <p>
                    <input className="form-profile-input" type="text" name="tags" id="tags" value="" placeholder="Alt Tag"/>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row-gallery">
            <div className="profile-box-form cut-block-2">
              <div className="profile-block-box">
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">Service</label>
                  </p>
                  <div className="row-content space-between">
                    <select className="gallery-select" name="services" id="services">
                      <option value="" disabled selected>Select from your services</option>
                      <option value="">Service 1</option>
                      <option value="">Service 2</option>
                      <option value="">Service 3</option>
                      <option value="">Service 4</option>
                    </select>
                    <img className="gallery-select-arrow" src="../../../public/images/down-select.png"
                         alt="select"/>
                    <p className="checkbox">
                      <input type="checkbox" name="delete" id="delete" value=""/>
                      <span className="gallery-checkbox-text">I confirm I have full rights for the use and publication of these images.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-button-block">
              <p className="form-login-buttons">
                <button className="button-green" onClick={this.generateUUID.bind(this)}>Confirm</button>
              </p>
              <p className="form-login-buttons">
                <button className="button-green-outline">Cancel</button>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

}

//@ts-ignore
export default withRouter(Gallery)
