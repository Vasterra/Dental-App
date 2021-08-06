import React, {useEffect, useState} from "react";
import {Auth, Storage, withSSRContext} from "aws-amplify";
import {useRouter} from "next/router";

import Layout from "src/components/Layout";
import AddSettings from "src/components/Dentist/Profile/settings/AddSettings";
import Location from "src/components/Dentist/Profile/settings/Location";
import Services from "src/components/Dentist/Profile/settings/Services";
import DisplayPhotos from "src/components/Dentist/Profile/settings/DisplayPhotos";
import ApiManager from "src/services/ApiManager";
import {CircularProgress} from "@material-ui/core";

import {WrapperFlex} from "src/styles/Main.module"
import {getDentist} from "src/graphql/queries";
import {GetServerSideProps} from "next";

const Profile = ({dentist}: any) => {
  const router = useRouter()

  const [currentDentist, setCurrentDentist]: any = useState(dentist)
  const [currentAvatar, setCurrentAvatar]: any = useState()
  const [signedInUser, setSignedInUser]: any = useState()
  const [currentUser, setCurrentUser]: any = useState()
  const [images, setImages]: any = useState()
  const [route, setRoute]: any = useState()

  useEffect(() => {
    if (router.query.slug !== undefined) {
      const {slug} = router.query
      setRoute(slug[0])
      authListener();
      downloadAvatar(currentDentist);
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
      <Layout title="Profile" active={'activeProfile'} currentAvatar={currentAvatar} currentDentist={currentDentist}>
        <div className="main-profile bg-white ">
          <AddSettings currentDentist={currentDentist} getDentist={getDentist}/>
          <Location route={route}/>
          <Services currentDentist={currentDentist} getDentist={getDentist}/>
          <DisplayPhotos currentDentist={currentDentist} currentAvatar={currentAvatar}
                           uploadAvatar={uploadAvatar}/>
        </div>
      </Layout>}
    </>
  )
};


// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const {API} = withSSRContext(context)
  let dentistData
  try {
    if (context.params.slug[0] === null) return
    dentistData = await API.graphql({
      query: getDentist,
      variables: {
        id: context.params.slug[0]
      },
      authMode: "AWS_IAM",
    });
  } catch (e) {
    console.log(e)
  }
  return {
    props: {
      dentist: dentistData ? dentistData.data.getDentist : null
    }
  }
}

export default Profile;