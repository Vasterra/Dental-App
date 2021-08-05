import { CircularProgress } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import GalleryPerson from "src/components/Gallery/GalleryPerson";
import { WrapperFlex } from "src/styles/Main.module";

type Props = {
  currentDentist: any,
  currentAvatar: any,
  services: any,
  images: any,
  oldIMages: any,
  setImages: Function,
  downloadImages: Function,
}

const ProfileAccountFree: React.FunctionComponent<Props> = ({currentDentist, oldIMages, images, currentAvatar, services, setImages, downloadImages}) => {
  const [location, setLocation]: any = useState();

  useEffect(() => {
    setLocation(window.location.href)
  }, [])

  const lastName = currentDentist.lastName === null ? '' : currentDentist.lastName
  const firstName = currentDentist.firstName === null ? '' : currentDentist.firstName

  const filterImagesByService = (e: { target: { value: string; }; }) => {
    setImages(null)
    if (e.target.value === 'All Service') return downloadImages()
    let newListImages: any[] = [];
    const filterImages = oldIMages.map((img: any[]) => img.filter((item: { service: string; }) => item.service === e.target.value));

    filterImages.forEach((arr: any) => {
      if (arr.length !== 0) {
        newListImages.push(arr)
      }
    });
    setTimeout(() => {
      setImages(newListImages)
    }, 1000)
  }
  const fullName = firstName + ' ' + lastName
  const adress = currentDentist.postIndex + ' ' + currentDentist.city + ' ' + currentDentist.street


  return (
    <>
      { !location && <WrapperFlex><CircularProgress size={120}/></WrapperFlex> }
      { location && <section className="container page">
        <div className="flex-menu">
          <div className="index-leftmenu">
            <div className="leftmenu-index-cover-image" />
            <div className="index-leftmenu-profile-information">
              <img className="index-leftmenu-profile-photo" src={currentAvatar} alt=""/>
              <div>
                <p className="form-login-title green px20 mt-30">{fullName}</p>
                <p className="form-login-subtitle gray px12 m-none">{currentDentist.qualifications}</p>
                <p className="form-login-subtitle gray px12 m-none">GDC No: {currentDentist.gdcNumber}</p>
              </div>
              <div className="index-leftmenu-text">
                <p>Bio</p>
                <p>Nulla eu tempor tortor. Sed iaculis sit amet purus eu pharetra. Maecenas eu risus sem. Fusce
                  sollicitudin sollicitudin sapien.</p>
                <p className="button-list">
                  {
                    currentDentist.services.items.map((el: any, key: any) => {
                      return (
                        <button className="index-green-button" key={key}>{el.name}</button>
                      )
                    })
                  }
                </p>
                <p>Contact </p>
                <p>
                  <span><strong>Email: </strong>{currentDentist.email}</span>
                </p>
                <p>Locations</p>
                <div className="flex-wrapper">
                  {
                    currentDentist.locations.items.map((el: any, key: any) => {
                      return (
                        <p><strong>{el.city}</strong> {el.address} - {el.postCode}</p>
                      )
                    })
                  }
                </div>
                {/*<div style={{marginTop: '10px'}}>*/}
                {/*  <QRCode value={location} size={100}/>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
          <div className="index-box-to-box">
            <div className="main-index index-main-box relative">
              <select className="gallery-select arrows bg-gray" name="services" id="services" onChange={filterImagesByService}>
                <option value="All Service" selected>All Service</option>
                { currentDentist.services.items.map((el: any, key: any) => {
                  return (
                    <option key={key} value={el.name}>{el.name}</option>
                    )
                })}
              </select>

              {!images && <WrapperFlex><CircularProgress size={120}/></WrapperFlex>}

              {Array.isArray(images) &&
                 <>
                   {images.length === 0 &&
                   <div className="flex-align-center">
                     <p className="index-leftmenu-text">Doctor {fullName} has not yet uploaded any of his works, be sure to check soon</p>
                   </div>}
                   {// @ts-ignore
                     images.length > 0 && <GalleryPerson images={images}/>
                   }
                 </>
              }
            </div>

          </div>
        </div>
      </section> }
    </>
  )
};

export default ProfileAccountFree
