import React, { useEffect, useState } from 'react';
import ReactImageProcess from 'react-image-process';
import { Storage } from 'aws-amplify';
import Snackbar from '../../../Snackbar';
import Error from 'next/error';
import ApiManager from '../../../../services/ApiManager';

type Props = {
  currentDentist: any
}

const AddWatermark: React.FunctionComponent<Props> = ({ currentDentist }) => {

  const [watermarkImg, setWatermarkImg]: any = useState();
  const [messageSnackBar, setMessageSnackBar]: any = useState();
  const [statusSnackBar, setStatusSnackBar]: any = useState();
  const [openSnackBar, setOpenSnackBar]: any = useState();
  const [currentCover, setCurrentCover]: any = useState();

  useEffect(() => {
    downloadCover();
  }, [])

  const addImage = async (e: any) => {
    e.preventDefault();
    let files: any;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCurrentCover(reader.result as any);
    };
    reader.readAsDataURL(files[0]);

    await uploadCover(files);
  };

  const uploadCover = async (files: any[]) => {
    try {
      await Storage.put(`cover/${currentDentist.id}/cover`, files[0], {
        contentType: 'image/png'
      }).then(() => {
        setMessageSnackBar('Success Upload!');
        setStatusSnackBar('success');
        setOpenSnackBar(true);
      })
      .catch((error: any) => {
        setMessageSnackBar(error);
        setStatusSnackBar('error');
        setOpenSnackBar(true);
      });
    } catch (error) {
      setMessageSnackBar(error);
      setStatusSnackBar('error');
      setOpenSnackBar(true);
    }
  };

  const downloadCover = async () => {
    await ApiManager.downloadCover(currentDentist).then(signedFiles => {
      setCurrentCover(signedFiles[0])
    })
  };

  const addWatermark = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setWatermarkImg(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  console.log(watermarkImg);
  return (
    <>
      <div className='mt-30'>
        <p className='form-profile-label'>
          <label className='form-profile-label'>Cover</label>
        </p>
        <p className='profile-photo-box'>
          {currentCover && <img className='image' src={currentCover} alt='' />}
        </p>
        <p className='row-content'>
          <label className='button-green-file'>Upload</label>
          <input type='file' className='input-file' name='watermark' id='watermark'
                 onChange={addImage} />
        </p>
      </div>
      <div>
        <p className='form-profile-label'>
          <label className='form-profile-label'>Watermark</label>
        </p>
        <p className='profile-photo-box'>
          {watermarkImg && <ReactImageProcess
            mode='waterMark'
            waterMarkType='image'
            waterMark={watermarkImg}
            coordinate={[10, 10]}
          >
            <img className='image' src={currentCover} alt='' />
          </ReactImageProcess>
          }
        </p>
        <p className='row-content'>
          <label className='button-green-file'>Upload</label>
          <input type='file' className='input-file' name='cover_image' id='cover_image' onChange={addWatermark} />
        </p>
      </div>
      <Snackbar
        messageSnackBar={messageSnackBar}
        statusSnackBar={statusSnackBar}
        openSnackBar={openSnackBar}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </>
  );
};

export default AddWatermark;

