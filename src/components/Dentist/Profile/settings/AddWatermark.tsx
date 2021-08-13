import React, { useEffect, useState } from 'react';
import ReactImageProcess from 'react-image-process';
import { Storage } from 'aws-amplify';
import Snackbar from '../../../Snackbar';
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

  console.log(currentCover);
  return (
    <>
      <div className='mt-30'>
        <p className='form-profile-label'>
          <label className='form-profile-label'>Cover</label>
        </p>
        { currentCover &&<p className='profile-photo-box'>
           <img className='image' src={currentCover} alt='' />
        </p> }
        { watermarkImg && <p className='profile-photo-box'>
          <ReactImageProcess
            mode='waterMark'
            waterMarkType='image'
            waterMark={watermarkImg}
            width={60}
            height={60}
            opacity={0.7}
            coordinate={[10, 10]}
          >
            <img className='image'
                 src={currentCover}
                 alt="waterMark"
            />
          </ReactImageProcess>
        </p> }
        <p className='row-content'>
          <label className='button-green-file'>Upload Cover</label>
          <input type='file' className='input-file' name='watermark' id='watermark'
                 onChange={addImage} disabled={currentDentist.hasPaidPlan}/>
        </p>
      </div>
      <div>
        <p className='form-profile-label'>
          <label className='form-profile-label'>Watermark</label>
        </p>
         <p className='profile-photo-box'>
           {watermarkImg &&<img className='image' src={watermarkImg} alt='' />}
        </p>
        <p className='row-content'>
          <label className='button-green-file'>Upload Watermark</label>
          <input type='file' className='input-file' name='cover_image' id='cover_image' onChange={addWatermark} disabled={!currentDentist.hasPaidPlan}/>
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

