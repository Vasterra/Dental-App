import React, {useCallback, useState} from 'react';
// @ts-ignore
import ReactCrop from 'react-image-crop';
import {API, Storage} from "aws-amplify";
import 'react-image-crop/dist/ReactCrop.css';
import SimpleImageSlider from "react-simple-image-slider";
import {deleteImage} from 'src/graphql/mutations';

type Props = {
  images: any,
  key: any,
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
  key,
  oldIMages,
  services,
  handlerShowUloadGallery,
  downloadImages,
  editGallery,
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
  const [title, setTitle] = useState(images[0].titleBefore);
  const [tags, setTags] = useState(images[0].tagsBefore);

  const onClickBullets = (idx: number) => {
    if (idx === 0) {
      setTitle(images[idx].titleBefore)
      setTags(images[idx].tagsBefore)
    } else {
      setTitle(images[idx].titleAfter)
      setTags(images[idx].tagsAfter)
    }
  };


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

  return (
    <div className="gallery-image-box" key={key}>
      <SimpleImageSlider
        width={333}
        height={333}
        images={images}
        showBullets={sliderOptions.showBullets}
        showNavs={sliderOptions.showNavs}
        startIndex={0}
        useGPURender={sliderOptions.useGPURender}
        navStyle={sliderOptions.navStyle}
        navSize={sliderOptions.navSize}
        navMargin={sliderOptions.navMargin}
        slideDuration={sliderOptions.duration}
        onClickBullets={onClickBullets}
      />
      <p className="gallery-image-watermark">Watermark</p>
      <div className="gallery-image-description">
        <p className="gallery-image-title">{title}</p>
        <p className="gallery-image-text">{tags}</p>
        <img className="gallery-image-edit" src="../../images/edit.svg" alt="edit" onClick={() => {
          editGallery(images, key)
        }}/>
        <img className="gallery-image-delete" src="../../images/delete_forever.svg" alt="delete"
             onClick={() => {
               removeImage(images, key)
             }}/>
      </div>
    </div>


  );
}

export default Gallery;
