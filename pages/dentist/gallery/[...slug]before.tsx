import React, {Component} from "react";
// import Drawer from "../../../components/Drawer";
// import Layout from "../../../components/Layout";
// import {InputSearch} from "../../../styles/Search.module";
// import {CircularProgress, Grid, IconButton} from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";
// import DownloadDropzone from "../../../components/Gallery/DownloadDropzone";
// import Breadcrumb from "../../../components/Breadcrumb";
// import GalleryComponent from "../../../components/Gallery";
// import {
//   Box,
//   CircularProgressWrapper,
//   FlexWrapper,
//   FormBlockWrapper,
//   MainContainer,
//   Search
// } from "../../../styles/Main.module";
// import {Auth, Hub, Storage} from "aws-amplify";
// import {withRouter} from "next/router";
// import DeleteFile from "../../../components/Gallery/DeleteFile";
// import ApiManager from "services/ApiManager";
//
// class Gallery extends Component {
//
//   state: any = {
//     dentist: [],
//     images: null,
//     deleteImage: null
//   }
//
//   async componentDidMount() {
//     await this.getDentist()
//   }
//
//   setDeleteImage(selectImages: any) {
//     this.setState({deleteImage: selectImages})
//   }
//
//   async authListener() {
//     const {router}: any = this.props
//     Hub.listen('auth', (data) => {
//       switch (data.payload.event) {
//         case 'signIn':
//           return this.setState({signedInUser: true})
//         case 'signOut':
//           return this.setState({signedInUser: false})
//       }
//     })
//     try {
//       const currentUser = await Auth.currentAuthenticatedUser();
//       this.setState({currentUser})
//       this.setState({signedInUser: true})
//       this.setState({isMe: currentUser.username === this.state.currentDentist.id});
//       if (!this.state.isMe) return router.push('/dentist/account/' + this.state.currentDentist.id)
//     } catch (err) {
//     }
//   }
//
//   async getDentist() {
//     const {router}: any = this.props
//     const currentDentist = await ApiManager.getDentist(router.query.slug[0]);
//     this.setState({currentDentist: currentDentist.getDentist});
//     await this.authListener()
//     await this.downloadImages()
//   }
//
//   async downloadImages() {
//     try {
//       if (this.state.dentist === null) return
//       const files = await Storage.list('images/' + this.state.dentist.id + '/')
//       let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
//       signedFiles = await Promise.all(signedFiles)
//       console.log('signedFiles: ', signedFiles)
//       let filesList = signedFiles.map((f: any, key: string | number) => {
//         return {
//           thumbnail: f,
//           src: f,
//           name: files[key].key,
//           thumbnailWidth: 320,
//           thumbnailHeight: 212,
//           isSelected: false
//         }
//       })
//       this.setState({ images: filesList })
//     } catch (error) {
//       console.log('Error uploading file: ', error);
//     }
//   }
//
//   render() {
//     return (
//       <>
//         {this.state.isMe && <Layout title="Profile Gallery">
//           {this.state.dentist && <Box>
//               {/*<Header/>*/}
//               <FlexWrapper>
//                   <Drawer
//                     currentAvatar={this.state.currentAvatar}
//                     currentDentist={this.state.currentDentist}
//                     currentUser={this.state.currentUser}
//                     signedInUser={this.state.signedInUser}
//                   />
//                   <MainContainer>
//                       <Breadcrumb point="Gallery"/>
//                       <FormBlockWrapper>
//                           <Grid container alignItems="center" justify="space-between" spacing={1}>
//                               <Grid item xs={12} sm={6} lg={6}>
//                                   <Grid container alignItems="center" justify="space-between">
//                                       <Grid item xs={12} sm={10} lg={6}>
//                                           <Search>
//                                               <IconButton type="submit" aria-label="search"
//                                                           style={{width: '45px', height: '45px', color: '#0d9da6'}}>
//                                                   <SearchIcon/>
//                                               </IconButton>
//                                               <InputSearch
//                                                   style={{width: '70%', background: 'transparent'}}
//                                                   placeholder="Search Images by title"
//                                               />
//                                           </Search>
//                                       </Grid>
//                                   </Grid>
//                               </Grid>
//                               <Grid item xs={12} sm={6} lg={6}>
//                                   <Grid container alignItems="center" justify="flex-end" spacing={1}>
//                                       <Grid item xs={12} sm={5} lg={4}>
//                                         <DeleteFile
//                                           // @ts-ignore
//                                           deleteImage={this.state.deleteImage} getImages={this.downloadImages.bind(this)}/>
//                                       </Grid>
//                                       <Grid item xs={12} sm={5} lg={4}>
//                                           <DownloadDropzone
//                                               dentist={this.state.dentist}
//                                               downloadImages={this.downloadImages.bind(this)}
//                                           />
//                                       </Grid>
//                                   </Grid>
//                               </Grid>
//                           </Grid>
//                       </FormBlockWrapper>
//                     {this.state.images &&
//                     <GalleryComponent
//                         images={this.state.images}
//                         setDeleteImage={this.setDeleteImage.bind(this)}
//                     />}
//                     {!this.state.images && <CircularProgressWrapper><CircularProgress/></CircularProgressWrapper>}
//                   </MainContainer>
//               </FlexWrapper>
//           </Box>}
//           {!this.state.dentist && <>Dentist not found</>}
//         </Layout>}
//       </>
//     );
//   }
//
// }
//
// //@ts-ignore
// export default withRouter(Gallery)
