import React, {Component, useEffect, useState} from "react";
import {Auth, Storage} from "aws-amplify";
import {useRouter} from "next/router";
import Error from "next/error";

import Layout from "src/components/Layout";
import AddSettings from "src/components/Dentist/Profile/settings/AddSettings";
import Location from "src/components/Dentist/Profile/settings/Location";
import Services from "src/components/Dentist/Profile/settings/Services";
import DisplayPhotos from "src/components/Dentist/Profile/settings/DisplayPhotos";
import ApiManager from "src/services/ApiManager";
import {CircularProgress} from "@material-ui/core";

import {WrapperFlex} from "src/styles/Main.module"

const Profile = () => {
  const router = useRouter()

  const [currentDentist, setCurrentDentist]: any = useState()
  const [currentAvatar, setCurrentAvatar]: any = useState()
  const [signedInUser, setSignedInUser]: any = useState()
  const [currentUser, setCurrentUser]: any = useState()
  const [images, setImages]: any = useState()
  const [route, setRoute]: any = useState()

  useEffect(() => {
    if (router.query.slug !== undefined) {
      const {slug} = router.query
      setRoute(slug[0])
      getDentist(slug[0]);
    }
  }, [router])

  const authListener = async () => {
    const signedInUser = ApiManager.authListener()
    setSignedInUser(signedInUser)
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setCurrentUser(currentUser)
      setSignedInUser(true)
    } catch (e) {
      console.log(e)
    }
  }

  const getDentist = async (id: string) => {
    setCurrentDentist(null)
    try {
      await ApiManager.getDentist(route ? route : id)
      .then(currentDentist => {
        console.log(currentDentist)
        setCurrentDentist(currentDentist);
        authListener();
        downloadAvatar(currentDentist);
      })
    } catch (e) {
      console.log(e)
    }
  }

  const downloadAvatar = async (currentDentist: any) => {
    ApiManager.downloadAvatar(currentDentist).then(signedFiles => {
      setCurrentAvatar(signedFiles)
    })
  }

  const downloadImages = async () => {
    try {
      ApiManager.downloadImages(currentDentist).then(filesList => {
        setImages(filesList)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const uploadAvatar = async (files: any) => {
    files.preventDefault();
    const file = files.target.files[0];
    const filename = file.name.split('.')
    try {
      await Storage.put('avatars/' + currentDentist.id + '/' + 'avatar.' + filename[filename.length - 1], file, {
        level: 'public',
        contentType: 'image/png',
      }).then(async (result: any) => {
        let signedFiles: any = Storage.get(result.key)
        signedFiles = await signedFiles.then((item: any) => {
          return item
        })
        setCurrentAvatar(signedFiles)
        downloadAvatar(currentDentist)
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

  !currentDentist && <WrapperFlex><CircularProgress size={120}/></WrapperFlex>
  return (
    <>
      {currentDentist &&
      <Layout title="Profile" active={'activeProfile'} currentAvatar={currentAvatar}>
        <div className="main-profile bg-white ">
          <AddSettings currentDentist={currentDentist} getDentist={getDentist}/>
          <Location currentDentist={currentDentist} getDentist={getDentist}/>
          <Services currentDentist={currentDentist} getDentist={getDentist}/>
          <DisplayPhotos currentDentist={currentDentist} currentAvatar={currentAvatar}
                           uploadAvatar={uploadAvatar}/>
        </div>
      </Layout>}
    </>
  )
};

export default Profile;