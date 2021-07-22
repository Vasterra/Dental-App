import React, {Component, useEffect, useState} from "react";
import {API, Auth, Hub, Storage} from "aws-amplify";
import {useRouter, withRouter} from "next/router";
import ApiManager from "src/services/ApiManager";
import ProfileAccountFree from "src/components/Dentist/PersonPage/profileAccountFree";
import ProfileAccountSubscription from "src/components/Dentist/PersonPage/profileAccountSubscription";
import Header from "src/components/Header";
import {listImages, listServiceForDentals} from "src/graphql/queries";
import {CircularProgress} from "@material-ui/core";
import Error from "next/error";

import {WrapperFlex} from "src/styles/Main.module"
import Layout from "src/components/Layout";

const Person = () => {
  const router = useRouter()

  const [currentDentist, setCurrentDentist]: any = useState()
  const [currentAvatar, setCurrentAvatar]: any = useState()
  const [signedInUser, setSignedInUser]: any = useState()
  const [currentUser, setCurrentUser]: any = useState()
  const [listImagesData, setListImagesData]: any = useState()
  const [services, setServices]: any = useState()
  const [images, setImages]: any = useState()
  const [oldIMages, setOldIMages]: any = useState()
  const [route, setRoute]: any = useState()

  useEffect(() => {
    if (router.query.slug !== undefined) {
      const {slug} = router.query
      setRoute(slug[0])
      getDentist(slug[0]);
      authListener()
    }
  }, [router])

  useEffect(() => {
    if (currentDentist !== undefined) {
      downloadAvatar();
    }
  }, [currentDentist])

  useEffect(() => {
    if (listImagesData !== undefined) {
      downloadImages();
    }
  }, [listImagesData])

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
    await ApiManager.getDentist(route ? route : id)
    .then(currentDentist => {
      setCurrentDentist(currentDentist);
      getListImages()
      getListServiceForDentals();
    })
  }

  const downloadAvatar = async () => {
    await ApiManager.downloadAvatar(currentDentist).then(signedFiles => {
      setCurrentAvatar(signedFiles)
    })
  }

  const setFuncImages = (images: any) => {
    setImages(images)
  }

  const getListImages = async () => {
    try {
      const {data}: any = await API.graphql({
        query: listImages,
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      setListImagesData(data.listImages.items)
    } catch (e) {
      console.log(e)
    }
  }

  const getListServiceForDentals = async () => {
    const {data}: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    setServices(data.listServiceForDentals.items)
  }


  const downloadImages = async () => {
    try {
      if (currentDentist === null) return
      if (listImagesData === undefined) return

      const listImagesFilter = listImagesData.filter((el: { dentistId: any; }) => el.dentistId === currentDentist.id);

      let eachImages: any[] = []
      listImagesFilter && listImagesFilter.forEach(async (e: any) => {
        const files = await Storage.list('images/' + currentDentist.id + '/' + e.id)

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
        setImages(eachImages)
        setOldIMages(eachImages)
      })
    } catch (e) {
      return <Error statusCode={404}/>
    }
  }
  if (!currentDentist) return <WrapperFlex><CircularProgress size={120}/></WrapperFlex>
  return (
    <>
      <Header/>
      {currentDentist && !currentDentist.hasPaidPlan && <ProfileAccountFree
          currentDentist={currentDentist}
          images={images}
          oldIMages={oldIMages}
          services={services}
          currentAvatar={currentAvatar}
          setImages={setFuncImages}
          downloadImages={downloadImages}
      />}
      {currentDentist && currentDentist.hasPaidPlan && <ProfileAccountSubscription
          currentDentist={currentDentist}
          images={images}
          oldIMages={oldIMages}
          services={services}
          currentAvatar={currentAvatar}
          setImages={setFuncImages}
          downloadImages={downloadImages}
      />}
    </>
  )
}

// @ts-ignore
export default withRouter(Person);
