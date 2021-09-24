import React, { useEffect, useState } from 'react';
// @ts-ignore
  import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import watermark from '../../utils/watermark/builded';

type Props = {
  saveCrop: any
  disabledButtonFiles: any
  anchor: any
  updateImg: any
  updateImgData: any
  nameUpdateImg: any
}

const UploadImage: React.FunctionComponent<Props> = ({
     saveCrop,
     anchor,
     disabledButtonFiles,
     updateImg,
     updateImgData,
     nameUpdateImg
   }) => {
  const [image, setImage]: any = useState(updateImg);
  const [file, setFile]: any = useState([updateImgData]);
  const [cropData, setCropData]: any = useState(false);
  const [cropper, setCropper]: any = useState<any>();
  const [completedCrop, setCompletedCrop]: any = useState(false);

  useEffect(() => {
    !updateImg ? setCompletedCrop(false) : setCompletedCrop(true);
  }, []);

  useEffect(() => {
    console.log('cropData', cropData);
  }, [cropData]);

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
      setFile(e.target.files as any);
    };
    reader.readAsDataURL(files[0]);
    setCompletedCrop(true);
  };

  const cancel = () => {
    setImage(null);
    setCompletedCrop(null);
    setCropData(false)
    disabledButtonFiles(anchor);
  };

  const getCropData = (file: { name: any; }[]) => {
    if (typeof cropper !== 'undefined') {
      if (!cropper.getCroppedCanvas()) {
        return;
      }
      if (cropper.getCroppedCanvas().toBlob) {
        cropper.getCroppedCanvas({
          width: 1024,
          height: 1024
        }).toBlob(function(blob: any) {
          const b: any = blob;
          b.lastModifiedDate = new Date();
          b.name = nameUpdateImg ? nameUpdateImg : file[0].name;
          console.log(blob);
          saveCrop(blob, anchor);
          setCropData(true)
        }, 'image/jpeg', 1);
      }
    }
  };

  return (
    <div className='gallery-block-image'>
      {!completedCrop && <p className='gallery-upload'>
        <label className='button-green-file'>Upload</label>
        <input type='file' className='input-file2' name='cover_image' id='cover_image' accept='image/*'
               onChange={onChange} />
        <span className='upload-subtitle'>Max Size 2MB</span>
      </p>}
      {completedCrop &&
      <>
        <Cropper
          style={{ height: 316, width: '100%' }}
          initialAspectRatio={1}
          cropBoxResizable={false}
          aspectRatio={1}
          preview='.img-preview'
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          cropend={() => {
            setCropData(false)
          }}
          guides={true}
        />
        <div className='uploadimage-settings'>
          <img className='delete-button' src='../../images/delete_forever.svg' alt='delete' onClick={cancel} />
          {!cropData && <button className='button-green' disabled={cropData} onClick={() =>
            getCropData(file)
          }>{cropData ? 'Crop' : 'Save Crop'}
          </button> }
        </div>
      </>
      }
    </div>
  );
};

export default UploadImage;
