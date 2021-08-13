import React, { useState } from 'react';
// @ts-ignore
import { API, Storage } from 'aws-amplify';
import 'react-image-crop/dist/ReactCrop.css';
import { deleteImage } from 'src/graphql/mutations';
// @ts-ignore
import ImageGallery from 'react-image-gallery';

const Gallery: React.FunctionComponent = ({
                                            imagesData,
    downloadImages,
    editGallery
  }: any) => {

  const [title, setTitle] = useState(imagesData[0].titleBefore);
  const [tags, setTags] = useState(imagesData[0].tagsBefore);

  const onClickBullets = (idx: number) => {
    if (idx === 0) {
      setTitle(imagesData[idx].titleBefore);
      setTags(imagesData[idx].tagsBefore);
    } else {
      setTitle(imagesData[idx].titleAfter);
      setTags(imagesData[idx].tagsAfter);
    }
  };


  const removeImage = async (e: any) => {
    await Storage.remove(e[0].name)
    .then(() => Storage.remove(e[1].name))
    .then(() => Storage.remove('images/' + e[0].dentistId + '/' + e[0].id))
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
    );
    downloadImages();
  };

  return (
    <div className='gallery-image-box'>
      <ImageGallery
        items={imagesData}
        showNav={false}
        showThumbnails={false}
        showPlayButton={false}
        showBullets={true}
        onSlide={onClickBullets}
      />
      <p className='gallery-image-watermark'>Watermark</p>
      <div className='gallery-image-description'>
        <p className='gallery-image-title'>{title}</p>
        <p className='gallery-image-text'>{tags}</p>
        <img className='gallery-image-edit' src='../../images/edit.svg' alt='edit' onClick={() => {
          editGallery(imagesData);
        }} />
        <img className='gallery-image-delete' src='../../images/delete_forever.svg' alt='delete'
             onClick={() => {
               removeImage(imagesData);
             }} />
      </div>
    </div>
  );
};

export default Gallery;
