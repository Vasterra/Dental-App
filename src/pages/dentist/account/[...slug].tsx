import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import {Auth, withSSRContext} from "aws-amplify";

import {WrapperFlex} from "../../../styles/Main.module"
import Layout from "src/components/Layout";
import AccountInformation from "src/components/Dentist/Account/AccountInformation";
import ResetPassword from "src/components/Dentist/Account/ResetPassword";
import Mysubscription from "src/components/Dentist/Account/MySubscription";
import BillingInformation from "src/components/Dentist/Account/BillingInformation";
import UpgradeToPremium from "src/components/Dentist/Account/UpgradeToPremium ";

import ApiManager from "src/services/ApiManager";
import {CircularProgress} from "@material-ui/core";
import {GetServerSideProps} from "next";
import {getDentist} from "src/graphql/queries";

const Account = ({dentist}: any) => {
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

  const downloadAvatar = async (currentDentist: any) => {
    ApiManager.downloadAvatar(currentDentist).then(signedFiles => {
      setCurrentAvatar(signedFiles)
    })
  }

  const onCancelSubscription = async () => {
    ApiManager.CREATE_CLOSED_SUBSCRIPTION(dentist.id)
    ApiManager.UPDATE_DENTIST(
      {
        id: dentist.id,
        hasPaidPlan: false
      }
    ).then(() => {
      ApiManager.getDentist(dentist.id).then(dent => {
        setCurrentDentist(dent)
      })
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

  if (!currentDentist) return <WrapperFlex><CircularProgress size={120}/></WrapperFlex>

  return (
    <>
      {currentDentist &&
      <Layout title="Account" active={'activeAccount'} currentAvatar={currentAvatar}>
          <div className="main-profile bg-white ">
              <div className="profile-box-form">
                  <div className="form-info-block">
                      <div>
                          <p className="form-login-title green px20">Account Information</p>
                          <p className="form-login-subtitle gray px12 mb-6px">Login Details</p>
                      </div>
                  </div>
                  <div className="box-2-box">
                    {currentDentist &&
                    <AccountInformation currentDentist={currentDentist}/>}
                    {currentDentist && <ResetPassword/>}
                  </div>
              </div>
              <div className="profile-box-form">
                  <div className="form-info-block">
                      <div>
                          <p className="form-login-title green px20">Upgrade to Premium</p>
                          <p className="form-login-subtitle gray px12 ">Paid Subscription</p>
                      </div>
                  </div>
                  <div className="box-2-box">
                    {!currentDentist.hasPaidPlan &&
                    <UpgradeToPremium currentDentist={currentDentist}/>}
                    {currentDentist.hasPaidPlan &&
                    <Mysubscription currentDentist={currentDentist} onCancelSubscription={onCancelSubscription}/>}
                    {currentDentist &&
                    <BillingInformation currentDentist={currentDentist}/>}
                  </div>
              </div>
          </div>
      </Layout>}
    </>
  )
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const {API} = withSSRContext(context)
  let dentistData;
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

export default Account;


