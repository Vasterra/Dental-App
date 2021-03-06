import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import GalleryPerson from 'src/components/Gallery/GalleryPerson';
import { WrapperFlex } from 'src/styles/Main.module';
import ApiManager from '../../../services/ApiManager';
import QRCode from 'qrcode';
import { Link } from '@material-ui/core';
import { IAdminSettingsSubscribers } from '../../../types/types';
import styled from 'styled-components';


export const QrCodeWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  canvas {
    margin-bottom: 10px;
  }
`;

type Props = {
  currentDentist: any,
  currentAvatar: any,
  services: any,
  images: any,
  oldIMages: any,
  adminSettingSubscriber: any,
  currentCover: any,
  setImages: Function,
  downloadImages: Function,
}

const ProfileAccountSubscription: React.FunctionComponent<Props> = ({
    currentCover,
    adminSettingSubscriber,
    currentDentist,
    oldIMages,
    images,
    currentAvatar,
    services,
    setImages,
    downloadImages
  }) => {
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const canvas: any = document.getElementById('canvas');
    void QRCode.toCanvas(canvas, window.location.href);
  }, []);

  const downloadQRCode = () => {
    const canvas: any = document.getElementById('canvas');
    const link: any = document.getElementById('link');
    link.setAttribute('download', 'QrCode.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
  }

  const lastName = currentDentist.lastName === null ? '' : currentDentist.lastName;
  const firstName = currentDentist.firstName === null ? '' : currentDentist.firstName;

  const filterImagesByService = (e: { target: { value: string; }; }) => {
    setImages(null);
    if (e.target.value === 'All Service') {
      downloadImages();
    }else{
      let newListImages: any[] = [];
      let filterImages: any[] = [];
      oldIMages.forEach((slider: any) => {
        const c: any[] = slider[0].service.replace(/[\])}[{(]/g, '').split(', ');
        c.forEach((item: any) => {
          if (item === e.target.value) {
            filterImages.push(slider);
          }
        })
        return filterImages;
      });
      filterImages.forEach((arr: any) => {
        if (arr.length !== 0) {
          newListImages.push(arr);
        }
      });
      if(!newListImages.length){
        setNotFound(true)
        return;
      }
      setImages(newListImages);
    }
  };

  const fullName = firstName + ' ' + lastName;
  return (
    <>
      {!currentDentist && <WrapperFlex><CircularProgress size={120} /></WrapperFlex>}
      {currentDentist && <section className='container page'>
        <div className='flex-menu'>
          <div className='index-leftmenu'>
            {currentCover ?
              <img className='leftmenu-index-cover-image' src={currentCover} alt='cover image' /> :
              <div className='leftmenu-index-cover-image' />}
            <div className='index-leftmenu-profile-information'>
              <img className='index-leftmenu-profile-photo' src={currentAvatar ? currentAvatar : '../../../../images/empty_avatar.png'} alt='' />
              <div>
                <div className='person-name-check green px20 mt-30 row-content'>
                  <p className='person-name-check_title green px20'>{fullName}</p>
                  {adminSettingSubscriber && adminSettingSubscriber.paidAppearVerified ?
                    <img className='index-gallery-image-watermark-img relative-img'
                         src='../../../../images/check_circle.svg' alt='check' /> : <></>}
                </div>
                <p className='form-login-subtitle gray px12 m-none'>{currentDentist.qualifications}</p>
                <p className='form-login-subtitle gray px12 m-none'>GDC No: {currentDentist.gdcNumber}</p>
              </div>
              <div className='index-leftmenu-text'>
                <p>Bio</p>
                <p>{currentDentist.bio}</p>
                <p className='button-list'>
                  {
                    currentDentist.services.items.map((el: any, key: any) => {
                      return (
                        <button className='index-green-button' key={key}>{el.name}</button>
                      );
                    })
                  }
                </p>
                <p>Contact </p>
                <p>
                  { adminSettingSubscriber && adminSettingSubscriber.paidPhoneNumber && <><span><strong>Phone: </strong>{currentDentist.phone}</span><br /></> }
                  <span><strong>Email: </strong>{currentDentist.email}</span><br />
                  { adminSettingSubscriber && adminSettingSubscriber.paidWebsiteAddress &&
                    <>
                      <span>
                        <strong>Website: </strong>
                        <Link href={`../../dentist/redirect/${currentDentist.website}`} target='_blank'>
                          {currentDentist.website}
                        </Link>
                      </span>
                    </>
                  }
                </p>
                <p>Locations</p>
                <div className='flex-wrapper'>
                  {
                    currentDentist.locations.items.map((el: any, key: any) => {
                      return (
                        <p><strong>{el.city}</strong> {el.address} - {el.postCode.toUpperCase()}</p>
                      );
                    })
                  }
                </div>
                <QrCodeWrapper>
                  <canvas id='canvas'/>
                  <a id="link"></a>
                  <button className='button-green-search qrDownload' onClick={downloadQRCode}>Download QRCode</button>
                </QrCodeWrapper>
              </div>
            </div>
          </div>
          <div className='index-box-to-box'>
            <div className='gallery-block'>
              {oldIMages && oldIMages.length !== 0 && <div className='gallery-block-services'>
                <select className='gallery-select arrows bg-gray' name='services' id='services'
                        onChange={filterImagesByService}>
                  <option value='All Service' selected>All Service</option>
                  {currentDentist.services.items.map((el: any, key: any) => {
                    return (
                      <option key={key} value={el.name}>{el.name}</option>
                    );
                  })}
                </select>
              </div>}
              {!images && <WrapperFlex><CircularProgress size={120} /></WrapperFlex>}

              {Array.isArray(images) &&
              <>
                {images.length === 0 &&
                <div className='flex-align-center'>
                  <p className='index-leftmenu-text'>
                    {!notFound ? `Dr ${fullName} has not uploaded any of their work yet, please check back later.`  : 'Not Found'}
                  </p>
                </div>}
                {// @ts-ignore
                  images.length > 0 && <GalleryPerson images={images} />
                }
              </>
              }
            </div>
          </div>
        </div>
      </section>}
    </>
  );
};

export default ProfileAccountSubscription;
