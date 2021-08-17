import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import GalleryPerson from 'src/components/Gallery/GalleryPerson';
import { WrapperFlex } from 'src/styles/Main.module';
import ApiManager from '../../../services/ApiManager';

type Props = {
  currentDentist: any,
  currentAvatar: any,
  services: any,
  images: any,
  oldIMages: any,
  setImages: Function,
  downloadImages: Function,
}

const ProfileAccountFree: React.FunctionComponent<Props> = ({
    currentDentist,
    oldIMages,
    images,
    currentAvatar,
    services,
    setImages,
    downloadImages
  }) => {
  const [location, setLocation]: any = useState(''); //qr
  const [adminSettingSubscriber, setAdminSettingSubscriber]: any = useState();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLocation(window.location.href);
    void getAdminSettingSubscriber().then((item: React.SetStateAction<undefined>) => setAdminSettingSubscriber(item));

  }, []);

  const filterImagesByService = (e: { target: { value: string; }; }) => {
    setImages(null);
    if (e.target.value === 'All Service') return downloadImages();

    let newListImages: any[] = [];
    let filterImages: any[] = [];
    oldIMages.forEach((slider: any) => {
      if (slider[0].service === []) {
        slider[0].service.forEach((service: string) => {
          if (service === e.target.value) {
            filterImages.push(slider);
          }
        });
      }
      return filterImages;
    });
    filterImages.forEach((arr: any) => {
      if (arr.length !== 0) {
        newListImages.push(arr);
      }
    });

    if (newListImages.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(true);
    }
    setTimeout(() => {
      setImages(newListImages);
    }, 1000);
  };

  const fullName = `${currentDentist.firstName ? currentDentist.firstName : ''} ${currentDentist.lastName ? currentDentist.lastName : ''}`;
  const getAdminSettingSubscriber = () => {
    return ApiManager.GET_ADMIN_SETTINGS_SUBSCRIBER();
  };

  return (
    <>
      {!currentDentist && <WrapperFlex><CircularProgress size={120} /></WrapperFlex>}
      {currentDentist && <section className='container page'>
        <div className='flex-menu'>
          <div className='index-leftmenu'>
            <div className='leftmenu-index-cover-image' />
            <div className='index-leftmenu-profile-information'>
              <img className='index-leftmenu-profile-photo'
                   src={currentAvatar ? currentAvatar : '../../../images/empty_avatar.png'} alt='' />
              <div>
                <div className='person-name-check green px20 mt-30 row-content'>
                  <p className='person-name-check_title green px20'>{fullName}</p>
                  {adminSettingSubscriber && adminSettingSubscriber.freeAppearVerified ?
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
                  <span><strong>Email: </strong>{currentDentist.email}</span>
                </p>
                <p>Locations</p>
                <div className='flex-wrapper'>
                  {
                    currentDentist.locations.items.map((el: any, key: any) => {
                      return (
                        <p><strong>{el.city}</strong> {el.address} - {el.postCode}</p>
                      );
                    })
                  }
                </div>
                {/*<div style={{marginTop: '10px'}}>*/}
                {/*  <QRCode value={location} size={100}/>*/}
                {/*</div>*/}
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
                  <p
                    className='index-leftmenu-text'>{!notFound ? `Doctor ${fullName} has not yet uploaded any of his works, be sure to check soon` : 'Not Found'}</p>
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

export default ProfileAccountFree;
