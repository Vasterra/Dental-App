import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import Snackbar from '../../../Snackbar';
import ApiManager from '../../../../services/ApiManager';
import watermark from '../../../../utils/watermark/builded';

type Props = {
  currentDentist: any
}

const AddWatermark: React.FunctionComponent<Props> = ({ currentDentist }) => {

  const [watermarkImg, setWatermarkImg]: any = useState();
  const [messageSnackBar, setMessageSnackBar]: any = useState();
  const [statusSnackBar, setStatusSnackBar]: any = useState();
  const [openSnackBar, setOpenSnackBar]: any = useState();
  const [currentCover, setCurrentCover]: any = useState();
  const [currentWatermark, setCurrentWatermark] = useState<any>();
  const [currentCoverImg, setCurrentCoverImg]: any = useState();
  const [isCurrentCover, setIsCurrentCover]: any = useState(false);

  useEffect(() => {
    downloadCover();
    downloadWatermark();
  }, []);

  const addCover = async (e: any) => {
    // setCurrentCoverImg(null);
    console.log(e);
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
      setIsCurrentCover(true);
    };
    reader.readAsDataURL(files[0]);
    await uploadCover(files);
  };

  const uploadCover = async (files: any[]) => {
    try {
      await Storage.put(`cover/${currentDentist.id}/cover`, files[0] ? files[0] : files, {
        contentType: 'image/png'
      }).then(() => {
        setMessageSnackBar('Successful upload!');
        setStatusSnackBar('success');
        setOpenSnackBar(true);
      })
      .catch((error: any) => {
        setMessageSnackBar(error);
        setStatusSnackBar('error');
        setOpenSnackBar(true);
      });
    } catch (error: any) {
      setMessageSnackBar(error);
      setStatusSnackBar('error');
      setOpenSnackBar(true);
    }
  };

  const downloadCover = async () => {
    await ApiManager.downloadCover(currentDentist).then(signedFiles => {
      setCurrentCover(signedFiles[0]);
    });
  };

  const downloadWatermark = async () => {
    await ApiManager.downloadWatermark(currentDentist).then(signedFiles => {
      console.log(signedFiles);
      setCurrentWatermark(signedFiles[0]);
    });
  };

  const addWatermark = async (e: any) => {
    // setCurrentCoverImg(null);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCurrentWatermark(reader.result as any);
      // addWaterMark(reader.result);
      // setIsCurrentCover(false);
    };
    reader.readAsDataURL(files[0]);
    // void ApiManager.CREATE_WATERMARK(files[0], currentDentist.id)
    await uploadWatermark(files);
  };

  const uploadWatermark = async (files: any[]) => {
    try {
      await Storage.put(`watermark/${currentDentist.id}/watermark`, files[0] ? files[0] : files, {
        contentType: 'image/png'
      }).then(() => {
        setMessageSnackBar('Successful upload!');
        setStatusSnackBar('success');
        setOpenSnackBar(true);
      })
        .catch((error: any) => {
          setMessageSnackBar(error);
          setStatusSnackBar('error');
          setOpenSnackBar(true);
        });
    } catch (error: any) {
      setMessageSnackBar(error);
      setStatusSnackBar('error');
      setOpenSnackBar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  // const addWaterMark = (e: string | ArrayBuffer | null) => {
  //   watermark([currentCover, e])
  //   .blob(watermark.image.upperRight())
  //   .then((img: any) => {
  //     setCurrentWatermark(reader.result as any);
  //   });
  //
  //   watermark([currentCover, e])
  //   .image(watermark.image.upperRight())
  //   .then((img: any) => {
  //     setCurrentCover(null);
  //     setCurrentCoverImg(img);
  //     document.getElementById('exp')!.appendChild(img);
  //   });
  // };

  return (
    <>
      <div>
        <p className='form-profile-label'>
          <label className='form-profile-label'>Cover</label>
        </p>
        <p className='profile-photo-box'>
          {currentCover ? 
            <img className='image' src={currentCover} alt='' /> 
            :
            <div className='image' id='exp' />}
        </p>
        { currentDentist.hasPaidPlan && <p className='row-content'>
          {!currentCover && !watermarkImg && <>
            <label className='button-green-file'>Upload Cover</label>
            <input type='file' className='input-file' name='watermark' onChange={(e) => {
              if (currentDentist.hasPaidPlan) {
                void addCover(e);
              } else {
                return false;
              }
            }} />
          </>}
          {currentCover && <>
            <button className='button-green'
                    onClick={() => {
                      if (currentDentist.hasPaidPlan) {
                        setCurrentCover(null);
                        setWatermarkImg(null);
                      } else {
                        return false;
                      }
                    }}
            >
              Clear Cover
            </button>
          </>}
        </p> }
      </div>
      {/*<div>*/}
      {/*  <p className='form-profile-label'>*/}
      {/*    <label className='form-profile-label'>Watermark</label>*/}
      {/*  </p>*/}
      {/*  <p className='profile-photo-box'>*/}
      {/*    {currentWatermark && <img className='image' src={currentWatermark} alt='' />}*/}
      {/*  </p>*/}
      {/*  <p className='row-content'>*/}
      {/*    {!currentWatermark && <>*/}
      {/*      <label className='button-green-file'>Upload Watermark</label>*/}
      {/*      <input type='file' className='input-file' name='cover_image' id='cover_image' onChange={(e) => {*/}
      {/*        if (currentDentist.hasPaidPlan) {*/}
      {/*          void addWatermark(e);*/}
      {/*        } else {*/}
      {/*          return false;*/}
      {/*        }*/}
      {/*      }} />*/}
      {/*    </>}*/}
      {/*    {currentWatermark && <>*/}
      {/*      <button className='button-green'*/}
      {/*              onClick={() => {*/}
      {/*                if (currentDentist.hasPaidPlan) {*/}
      {/*                  // setCurrentCover(null);*/}
      {/*                  setCurrentWatermark(null);*/}
      {/*                } else {*/}
      {/*                  return false;*/}
      {/*                }*/}
      {/*              }}*/}
      {/*      >*/}
      {/*        Clear watermark*/}
      {/*      </button>*/}
      {/*    </>}*/}
      {/*  </p>*/}
      {/*</div>*/}
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

