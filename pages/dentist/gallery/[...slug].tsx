import React, {Component} from "react";
import {withRouter} from "next/router";
import {v4 as uuidv4} from 'uuid';
import Layout from "../../../components/Layout";
import {API, Auth, Hub, Storage} from "aws-amplify";
import ApiManager from "services/ApiManager";
import Drawer from "components/Drawer";
import UploadImage from "components/Gallery/UploadImage";
import Services from "components/Gallery/Services";
import {listServiceForDentals} from "graphql/queries";
import {createImage} from "graphql/mutations";
import Snackbar from "components/Snackbar";

class Gallery extends Component {

  state: any = {
    images: null,
    deleteImage: null,
    currentDentist: null,
    currentAvatar: null,
    signedInUser: null,
    currentUser: null,
    isMe: false,
    uuid: null,
    files: [],
    titleBefore: null,
    tagsBefore: null,
    titleAfter: null,
    tagsAfter: null,
    service: null,
    services: null,
    check: null,
    checkFilesLeft: false,
    checkFilesRight: false,
    messageSnackBar: null,
    statusSnackBar: null,
    openSnackBar: false,
  }

  async componentDidMount() {
    await this.getDentist()
    this.setState({uuid: uuidv4()})
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
    await this.getListServiceForDentals()
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

  handleCloseSnackbar = () => {
    this.setState({openSnackBar: false})
  }

  async getListServiceForDentals() {
    const {data}: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    this.setState({services: data.listServiceForDentals.items})
  }

  saveCrop(value: any, anchor: any) {
    if (anchor === 'left') {
      this.state.files[0] = value;
      this.setState({checkFilesLeft: true})
    } else {
      this.setState({checkFilesRight: true})
      this.state.files[1] = value;
    }
    console.log(this.state.checkFilesLeft)
    console.log(this.state.checkFilesRight)
  }

  saveService(value: any) {
    this.setState({service: value})
  }

  desabledButtonFiles(anchor: any) {
    if (anchor === 'left') {
      this.setState({checkFilesLeft: false})
    } else {
      this.setState({checkFilesRight: false})
    }
  }

  checkHandler({target}: any) {
    this.setState({check: target.checked})
  }

  onChangeBeforeTitle(e: any) {
    this.setState({titleBefore: e.target.value})
  }

  async saveData() {
    if (!this.state.check) return console.log('I confirm I have full rights for the use and publication of these images.')
    this.uploadImage()
    try {
      await API.graphql({
        query: createImage,
        variables: {
          input: {
            id: this.state.uuid,
            dentistId: this.state.currentDentist.id,
            titleBefore: this.state.titleBefore,
            tagsBefore: this.state.tagsBefore,
            titleAfter: this.state.titleAfter,
            tagsAfter: this.state.tagsAfter,
            service: this.state.service,
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      })
      this.setState({uuid: uuidv4()})
      this.setState({messageSnackBar: 'Success!'})
      this.setState({statusSnackBar: 'success'})
      this.setState({openSnackBar: true})
    } catch (error) {
      this.setState({messageSnackBar: error})
      this.setState({statusSnackBar: 'error'})
      this.setState({openSnackBar: true})
    }
  }

  uploadImage() {
    this.state.files.forEach(async (file: any) => {
      try {
        await Storage.put('images/' + this.state.currentDentist.id + '/' + this.state.uuid + '/' + file.name, file, {
          contentType: 'image/png',
          progressCallback(progress: { loaded: number; total: number; }) {
            const percentUploaded: number = Math.round((progress.loaded / progress.total) * 100)
            // setPercent(percentUploaded)
          },
        }).then(result => {
          console.log(result)
          this.setState({messageSnackBar: 'Success Upload!'})
          this.setState({statusSnackBar: 'success'})
          this.setState({openSnackBar: true})
        })
          .catch((error: any) => {
            this.setState({messageSnackBar: error})
            this.setState({statusSnackBar: 'error'})
            this.setState({openSnackBar: true})
          });
      } catch (error) {
        this.setState({messageSnackBar: error})
        this.setState({statusSnackBar: 'error'})
        this.setState({openSnackBar: true})
      }
    })

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
                <UploadImage
                  saveCrop={this.saveCrop.bind(this)}
                  desabledButtonFiles={this.desabledButtonFiles.bind(this)}
                  anchor="left"
                />
                <div>
                  <p className="form-profile-label">Title</p>
                  <p>
                    <input className="form-profile-input"
                           type="text"
                           name="title"
                           id="title"
                           value={this.state.titleBefore}
                           placeholder="Image Title"
                           onChange={(e) => this.setState({titleBefore: e.target.value})}
                    />
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">Alt Tags</p>
                  <p>
                    <input className="form-profile-input"
                           type="text"
                           name="tags"
                           id="tags"
                           value={this.state.tagsBefore}
                           placeholder="Alt Tag"
                           onChange={(e) => this.setState({tagsBefore: e.target.value})}
                    />
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
                <UploadImage
                  saveCrop={this.saveCrop.bind(this)}
                  desabledButtonFiles={this.desabledButtonFiles.bind(this)}
                  anchor="rigth"
                />
                <div>
                  <p className="form-profile-label">Title</p>
                  <p>
                    <input className="form-profile-input"
                           type="text"
                           name="title"
                           id="title"
                           value={this.state.titleAfter}
                           placeholder="Image Title"
                           onChange={(e) => this.setState({titleAfter: e.target.value})}
                    />
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">Alt Tags</p>
                  <p>
                    <input className="form-profile-input"
                           type="text"
                           name="tags"
                           id="tags"
                           value={this.state.tagsAfter}
                           placeholder="Alt Tag"
                           onChange={(e) => this.setState({tagsAfter: e.target.value})}
                    />
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
                    {this.state.services &&
                    <Services saveService={this.saveService.bind(this)} services={this.state.services}/>}
                    <img className="gallery-select-arrow" src="../../../public/images/down-select.png"
                         alt="select"/>
                    <p className="checkbox">
                      <input type="checkbox" name="delete" id="delete" onChange={this.checkHandler.bind(this)}/>
                      <span className="gallery-checkbox-text">I confirm I have full rights for the use and publication of these images.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-button-block">
              <p className="form-login-buttons">
                <button className="button-green" onClick={this.saveData.bind(this)}
                        disabled={!this.state.checkFilesLeft || !this.state.checkFilesRight || !this.state.titleBefore || !this.state.tagsBefore || !this.state.titleAfter ||
                        !this.state.tagsAfter || !this.state.service || !this.state.check}
                >Confirm
                </button>
              </p>
              <p className="form-login-buttons">
                <button className="button-green-outline">Cancel</button>
              </p>
            </div>
          </div>
        </div>
        <Snackbar
          messageSnackBar={this.state.messageSnackBar}
          statusSnackBar={this.state.statusSnackBar}
          openSnackBar={this.state.openSnackBar}
          handleCloseSnackbar={this.handleCloseSnackbar.bind(this)}
        />
      </Layout>
    );
  }
}

//@ts-ignore
export default withRouter(Gallery)
