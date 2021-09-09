import React, { useEffect, useState } from 'react';
// @ts-ignore
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

type Props = {
  handlerWaterMarkImage: any
}

const UploadImage: React.FunctionComponent<Props> = ({ handlerWaterMarkImage }) => {
  const [image, setImage] = useState<any>();
  const [isWaterMark, setIsWaterMark] = useState<boolean>()

  useEffect(() => {
  }, []);

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
      handlerWaterMarkImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
    setIsWaterMark(true)
  };
  const cancel = () => {
    setImage(null);
    setIsWaterMark(false)
  };

  return (
    <div className='gallery-block-image'>
      {!isWaterMark && <p className='gallery-upload'>
        <label className='button-green-file'>Upload</label>
        <input type='file' className='input-file2' name='cover_image' id='cover_image' accept='image/*'
               onChange={onChange} />
        <span className='upload-subtitle'>Max Size 2MB</span>
      </p>}
      {isWaterMark &&
      <>
        <img src={image} alt='watermark' />
        <div className='uploadimage-settings'>
          <img className='delete-button' src='../../images/delete_forever.svg' alt='delete' onClick={cancel} />
        </div>
      </>
      }
    </div>
  );
};

export default UploadImage;
