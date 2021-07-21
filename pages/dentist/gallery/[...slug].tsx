import React, {Component} from "react";
import {withRouter} from "next/router";
import {v4 as uuidv4} from 'uuid';
import Layout from "../../../components/Layout";
import {API, Auth, Hub, Storage} from "aws-amplify";
import ApiManager from "services/ApiManager";
import UploadImage from "components/Gallery/UploadImage";
import Gallery from "components/Gallery/Gallery";
import Services from "components/Gallery/Services";
import {listImages, listServiceForDentals} from "graphql/queries";
import {createImage, updateImage} from "graphql/mutations";
import Snackbar from "components/Snackbar";
import {CircularProgress} from "@material-ui/core";
import Error from "next/error";
// @ts-ignore
import {WrapperFlex} from "../../../styles/Main.module"

class GalleryPage extends Component {

  state: any = {
    images: null,
    loading: true,
    oldIMages: null,
    updateImg: null,
    listImages: null,
    deleteImage: null,
    currentDentist: null,
    currentAvatar: null,
    signedInUser: null,
    currentUser: null,
    updateService: null,
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
    showUloadGallery: false,
    openSnackBar: false,
    updateImgEvent: false,
  }

  async componentDidMount() {
    await this.getDentist();
    await this.authListener();
    await this.getListImages();
    await this.getListServiceForDentals()
    await this.downloadImages();
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
    } catch (e) {
      console.log(e)
    }
  }

  async getDentist() {
    try {
      const {router}: any = this.props
      const currentDentist = await ApiManager.getDentist(router.query.slug[0]);
      this.setState({currentDentist: currentDentist});
    } catch (e) {
      return <Error statusCode={404}/>
    }
  }

  async downloadAvatar() {
    if (this.state.currentDentist === null) return
    try {
      const files = await Storage.list('avatars/' + this.state.currentDentist.id + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      this.setState({currentAvatar: signedFiles[signedFiles.length - 1]})
    } catch (e) {
      console.log(e)
    }
  }

  handleCloseSnackbar = () => {
    this.setState({openSnackBar: false})
  }

  async getListServiceForDentals() {
    try {
      const {data}: any = await API.graphql({
        query: listServiceForDentals,
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      this.setState({services: data.listServiceForDentals.items})
    } catch (e) {
      return <Error statusCode={404}/>
    }
  }

  async getListImages() {
    try {
      const {data}: any = await API.graphql({
        query: listImages,
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      this.setState({listImages: data.listImages.items})
    } catch (e) {
      return <Error statusCode={404}/>
    }
  }

  saveCrop(value: any, anchor: any) {
    if (anchor === 'left') {
      this.state.files[0] = value;
      this.setState({checkFilesLeft: true})
    } else {
      this.state.files[1] = value;
      this.setState({checkFilesRight: true})
    }
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

  async saveDataUpdate() {
    if (!this.state.check) return console.log('I confirm I have full rights for the use and publication of these images.')
    this.uploadUpdateImage()
    try {
      // @ts-ignore
      await API.graphql({
        query: updateImage,
        variables: {
          input: {
            id: this.state.updateImg[1].id,
            dentistId: this.state.currentDentist.id,
            titleBefore: this.state.titleBefore,
            tagsBefore: this.state.tagsBefore,
            titleAfter: this.state.titleAfter,
            tagsAfter: this.state.tagsAfter,
            service: this.state.service,
            nameBefore: this.state.files[0].name,
            nameAfter: this.state.files[1].name,
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

  async saveData() {
    if (this.state.updateImgEvent) {
      this.saveDataUpdate()
      return;
    }
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
            nameBefore: this.state.files[0].name,
            nameAfter: this.state.files[1].name,
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

  uploadUpdateImage() {
    this.state.files.forEach(async (file: any, key: any) => {
      try {
        await Storage.put('images/' + this.state.currentDentist.id + '/' + this.state.updateImg[key].id + '/' + file.name, file, {
          contentType: 'image/png',
          progressCallback(progress: { loaded: number; total: number; }) {
            const percentUploaded: number = Math.round((progress.loaded / progress.total) * 100)
          },
        }).then(result => {
          this.setState({messageSnackBar: 'Success Upload!'})
          this.setState({statusSnackBar: 'success'})
          this.setState({openSnackBar: true})
          this.downloadImages()
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
    this.handlerShowGallery();
    this.downloadImages();
  }

  uploadImage() {
    this.state.files.forEach(async (file: any) => {
      try {
        await Storage.put('images/' + this.state.currentDentist.id + '/' + this.state.uuid + '/' + file.name, file, {
          contentType: 'image/png',
          progressCallback(progress: { loaded: number; total: number; }) {
            const percentUploaded: number = Math.round((progress.loaded / progress.total) * 100)
          },
        }).then(result => {
          this.setState({messageSnackBar: 'Success Upload!'})
          this.setState({statusSnackBar: 'success'})
          this.setState({openSnackBar: true})
          this.downloadImages()
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
    this.handlerShowGallery();
    this.downloadImages();
  }

  downloadImages() {
    this.setState({images: null})
    this.setState({oldIMages: null})
    this.setState({loading: true})
    try {
      if (this.state.currentDentist === null) return
      let eachImages: any[] = []
      this.state.listImages.forEach(async (e: any) => {
        const files = await Storage.list('images/' + this.state.currentDentist.id + '/' + e.id)
        let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
        signedFiles = await Promise.all(signedFiles)
        let filesList = signedFiles.map((f: any, key: string | number) => {
          const amazon = f.split('amazonaws.com')
          return {
            id: e.id,
            dentistId: e.dentistId,
            thumbnail: f,
            url: f,
            imgUrl: amazon[0] + 'amazonaws.com/public/' + files[key].key,
            name: files[key].key,
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            isSelected: false,
            titleBefore: e.titleBefore,
            tagsBefore: e.titleBefore,
            titleAfter: e.titleAfter,
            tagsAfter: e.tagsAfter,
            service: e.service,
            nameBefore: e.nameBefore,
            nameAfter: e.nameAfter
          }
        })
        if (filesList.length !== 0) {
          eachImages.push(filesList)
        }
        this.setState({images: eachImages})
        this.setState({oldIMages: eachImages})
      })
      this.setState({loading: false})
    } catch (e) {
      return <Error statusCode={404}/>
    }
  }

  setImages(images: any) {
    this.setState({images: images})
  }

  handlerShowUloadGallery() {
    this.setState({showUloadGallery: true})
  }

  handlerShowGallery() {
    this.setState({showUloadGallery: false})
  }

  editGallery(val: any) {
    this.setState({showUloadGallery: true})
    this.setState({updateImgEvent: true})
    this.setState({updateImg: val})
    this.setState({titleBefore: val[1].titleBefore})
    this.setState({tagsBefore: val[1].tagsBefore})
    this.setState({titleAfter: val[1].titleAfter})
    this.setState({tagsAfter: val[1].tagsAfter})
    this.setState({service: val[1].service})
    this.setState({updateService: val[1].service})
  }

  render() {
    if (!this.state.currentDentist) return <WrapperFlex><CircularProgress size={120}/></WrapperFlex>
    return (
      <Layout title="Gallery" active={'activeGallery'} currentAvatar={this.state.currentAvatar}>
        <div className="main-profile bg-white ">
          {    // @ts-ignore
            !this.state.showUloadGallery &&
            <Gallery
              // @ts-ignore
                images={this.state.images}
                loading={this.state.loading}
                oldIMages={this.state.oldIMages}
                services={this.state.services}
                setImages={this.setImages.bind(this)}
                editGallery={this.editGallery.bind(this)}
                downloadImages={this.downloadImages.bind(this)}
                handlerShowUloadGallery={this.handlerShowUloadGallery.bind(this)}
            />
          }
          {
            this.state.showUloadGallery && <>
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
                                updateImg={this.state.updateImg && this.state.updateImg[0].imgUrl}
                                updateImgData={this.state.updateImg && this.state.updateImg[0]}
                                nameUpdateImg={this.state.updateImg && this.state.updateImg[0].nameBefore}
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
                                updateImg={this.state.updateImg && this.state.updateImg[1].imgUrl}
                                updateImgData={this.state.updateImg && this.state.updateImg[1]}
                                nameUpdateImg={this.state.updateImg && this.state.updateImg[1].nameAfter}
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
                                  <Services saveService={this.saveService.bind(this)} services={this.state.services}
                                            updateService={this.state.updateService}/>}
                                    <img className="gallery-select-arrow" src="../../../public/images/down-select.png"
                                         alt="select"/>
                                    <p className="checkbox">
                                        <input type="checkbox" name="delete" id="delete"
                                               onChange={this.checkHandler.bind(this)}/>
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
                            <button className="button-green-outline"
                                    onClick={this.handlerShowGallery.bind(this)}>Cancel
                            </button>
                        </p>
                    </div>
                </div>
            </>
          }
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
export default withRouter(GalleryPage)
