import React, {useCallback, useState} from 'react';
// @ts-ignore
import ReactCrop from 'react-image-crop';
import {API, Storage} from "aws-amplify";
import 'react-image-crop/dist/ReactCrop.css';
import SimpleImageSlider from "react-simple-image-slider";
import {deleteImage} from 'graphql/mutations';
// @ts-ignore
import Loader from "react-loader-spinner";
type Props = {
  images: any,
  oldIMages: any,
  services: any,
  setImages: Function
  editGallery: Function
  downloadImages: Function
  handlerShowUloadGallery: Function
}

type SliderOptions = {
  useGPURender: boolean;
  showNavs: boolean;
  showBullets: boolean;
  loading: boolean;
  navStyle: 1 | 2;
  navSize: number;
  navMargin: number;
  duration: number;
  bgColor: string;
};

const Gallery: React.FunctionComponent = ({
    images,
    oldIMages,
    services,
    handlerShowUloadGallery,
    downloadImages,
    editGallery,
    loading,
    setImages
  }: any) => {

  // @ts-ignore
  const [sliderOptions, setSliderOptions] = useState<SliderOptions>({
    useGPURender: true,
    showNavs: false,
    showBullets: true,
    navStyle: 1,
    navSize: 50,
    navMargin: 30,
    duration: 0.5,
    bgColor: '#000'
  });

  const [slideIndexText, setSlideIndexText] = useState<string>('');
  const [indexData, setIndexData] = useState<number>(0);

  const onClickBullets = (idx: number) => {
    setIndexData(idx)
  };

  const filterImagesByService = (e: { target: { value: string; }; }) => {
    if (e.target.value === 'All Service') return downloadImages()
    let newListImages: any[] = [];
    const filterImages = oldIMages.map((img: any[]) => img.filter((item: { service: string; }) => item.service === e.target.value));

    filterImages.forEach((arr: any) => {
      if (arr.length !== 0) {
        // @ts-ignore
        newListImages.push(arr)
      }
    });
    // @ts-ignore
    setImages(newListImages)
  }

  const removeImage = async (e: any, key: any) => {
    await Storage.remove(e[0].name)
      .then(async () => await Storage.remove(e[1].name))
      .then(async () => await Storage.remove('images/' + e[0].dentistId + '/' + e[0].id))
      .then(async () => {
          await API.graphql({
            query: deleteImage,
            variables: {
              input: {
                id: e[0].id
              }
            },
            // @ts-ignore
            authMode: 'AWS_IAM'
          });
        }
      )
    downloadImages()
  }

  const onClick = useCallback((idx: number, event: React.SyntheticEvent) => {
    console.log(`[App onClick] ${idx} ${event.currentTarget}`);
  }, []);
  console.log('loading', loading)
  return (
    <>
      <div className="profile-box-form">
        <div className="form-info-block">
          <div>
            <p className="form-login-title green px20">Gallery</p>
            <p className="form-login-subtitle gray px12 mb-6px">Add and edit your portfolio</p>
          </div>
        </div>
        <div className="search-gallery">
          <input className="search-users" type="search" id="search" name="search" value="" placeholder="Search Images"/>
          <img className="search-button" src="../../images/search.svg" alt="search"/>
          <button className="button-green centered" onClick={handlerShowUloadGallery}>Upload to gallery</button>
        </div>
      </div>
      {images && <>
          <div className="flex-end">
              <select className="gallery-select arrows bg-gray" name="services" id="services"
                      onChange={() => filterImagesByService}>
                  <option value="All Service" selected>All Service</option>
                {services && services.map((item: any, key: any) => (
                  <option key={key} value={item.name}>{item.name}</option>
                ))}
              </select>
          </div>
        {
          loading && <Loader
              type="TailSpin"
              color="#095c5c"
              height={100}
              width={100}
          />
        }
        { !loading && <div className="gallery-box">
          {
            images.map((val: any[], key: any) => {
              return (
                <div className="gallery-image-box" key={key}>
                  <SimpleImageSlider
                    width={333}
                    height={333}
                    images={val}
                    showBullets={sliderOptions.showBullets}
                    showNavs={sliderOptions.showNavs}
                    startIndex={0}
                    useGPURender={sliderOptions.useGPURender}
                    navStyle={sliderOptions.navStyle}
                    navSize={sliderOptions.navSize}
                    navMargin={sliderOptions.navMargin}
                    slideDuration={sliderOptions.duration}
                    onClickBullets={onClickBullets}
                    onClick={onClick}
                  />
                  <p className="gallery-image-watermark">Watermark</p>
                  <div className="gallery-image-description">
                    <p className="gallery-image-title">{val[indexData].titleBefore}</p>
                    <p className="gallery-image-text">Image Alt Text</p>
                    <img className="gallery-image-edit" src="../../images/edit.svg" alt="edit" onClick={() => {
                      editGallery(val, key)
                    }}/>
                    <img className="gallery-image-delete" src="../../images/delete_forever.svg" alt="delete"
                         onClick={() => {
                           removeImage(val, key)
                         }}/>
                  </div>
                </div>
              )
            })
          }
        </div>
        }
      </>
      }
    </>
  );
}

export default Gallery;
