import React, {useCallback, useState} from 'react';
// @ts-ignore
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import SimpleImageSlider from "react-simple-image-slider";

type Props = {
  images: any,
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

const Gallery: React.FunctionComponent = ({images}: any) => {

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
  console.log('images', images)
  return (
    <>
      {
        images && <div className="index-dentist-gallery-box">
          {
            images.map((val: any[], key: any) => {
              return (
                <div className="index-dentist-gallery-image-box" key={key}>
                  <SimpleImageSlider
                    width={247}
                    height={247}
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
                </div>
              )
            })
          }
        </div>
      }
    </>
  );
}

export default Gallery;
