import React, {useCallback, useState} from 'react';
// @ts-ignore
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import SimpleImageSlider from "react-simple-image-slider";

type Props = {
  images: any,
  handlerShowUloadGallery: Function
}

type SliderOptions = {
  useGPURender: boolean;
  showNavs: boolean;
  showBullets: boolean;
  navStyle: 1 | 2;
  navSize: number;
  navMargin: number;
  duration: number;
  bgColor: string;
};

const Gallery: React.FunctionComponent = ({images, handlerShowUloadGallery}: any) => {

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
    console.log(`[App onClickBullets] ${idx}`);
    setIndexData(idx)
  };

  const onClick = useCallback((idx: number, event: React.SyntheticEvent) => {
    console.log(`[App onClick] ${idx} ${event.currentTarget}`);
  }, []);

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
      <div className="flex-end"><p className="form-profile-label">
        Service
      </p>
        <img className="flex-end-arrow" src="../../images/little-arrow-bottom.svg" alt="arrow"/>
      </div>
      <div className="gallery-box">
        {
          images.map((val: any[]) => {
            console.log(val)
            return (
              <div className="gallery-image-box">
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
                  <img className="gallery-image-edit" src="../../images/edit.svg" alt="edit"/>
                  <img className="gallery-image-delete" src="../../images/delete_forever.svg" alt="delete"/>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default Gallery;
