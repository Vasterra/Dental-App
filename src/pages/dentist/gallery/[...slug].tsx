import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Layout from 'src/components/Layout';
import { API, Auth, Storage, withSSRContext } from 'aws-amplify';
import ApiManager from 'src/services/ApiManager';
import UploadImage from 'src/components/Gallery/UploadImage';
import Gallery from 'src/components/Gallery/Gallery';
import Services from 'src/components/Gallery/Services';
import { getDentist, listImages, listServiceForDentals } from 'src/graphql/queries';
import { createImage, updateImage } from 'src/graphql/mutations';
import { Snackbar } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Error from 'next/error';
import { WrapperFlex } from 'src/styles/Main.module';
import { GetServerSideProps } from 'next';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import watermark from '../../../utils/watermark/builded';
import WaterMarkUpload from '../../../components/Gallery/WaterMark'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const GalleryPage = ({ dentist, error }: any) => {
  const router = useRouter();

  const [currentDentist, setCurrentDentist]: any = useState(dentist);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [signedInUser, setSignedInUser]: any = useState();
  const [imagesData, setImagesData]: any = useState();
  const [oldIMages, setOldIMages]: any = useState();
  const [route, setRoute]: any = useState();
  const [updateImg, setUpdateImg]: any = useState();
  const [listImagesData, setListImagesData]: any = useState();
  const [updateService, setUpdateService]: any = useState();
  const [uuid, setUuid]: any = useState();
  const [fileLeft, setFileLeft]: any = useState();
  const [fileRight, setFileRight]: any = useState();
  const [titleBefore, setTitleBefore]: any = useState();
  const [tagsBefore, setTagsBefore]: any = useState();
  const [titleAfter, setTitleAfter]: any = useState();
  const [tagsAfter, setTagsAfter]: any = useState();
  const [service, setService]: any = useState();
  const [services, setServices]: any = useState();
  const [check, setCheck]: any = useState();
  const [checkFilesLeft, setCheckFilesLeft]: any = useState();
  const [checkFilesRight, setCheckFilesRight]: any = useState();
  const [showUloadGallery, setShowUloadGallery]: any = useState();
  const [updateImgEvent, setUpdateImgEvent]: any = useState();
  const [searchValue, setSearchValue]: any = useState();
  const [currentWatermark, setCurrentWatermark] = useState<any>();
  const [showServicesPanel, setShowServicesPanel] = useState<boolean>(true);

  const [openSnackBar, setOpenSnackBar]: any = useState();
  const [messageSnackBar, setMessageSnackBar]: any = useState();
  const [statusSnackBar, setStatusSnackBar]: any = useState();

  useEffect(() => {
    if (router.query.slug !== undefined) {
      const { slug } = router.query;
      setUuid(uuidv4());
      setRoute(slug[0]);
      authListener();
      getListImages();
      getListServiceForDentals();
      downloadWatermark();

    }
  }, [router]);

  useEffect(() => {
    if (currentDentist !== undefined) {
      void downloadAvatar(currentDentist);
    }
  }, [currentDentist]);

  useEffect(() => {
    if (listImagesData !== undefined) {
      void downloadImages();
    }
  }, [listImagesData]);

  const authListener = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
    } catch (e: any) {
      void await Router.push('/login');
    }
  };

  const downloadWatermark = async () => {
    await ApiManager.downloadWatermark(currentDentist).then(signedFiles => {
      setCurrentWatermark(signedFiles[0]);
    });
  };

  const downloadAvatar = async (currentDentist: any) => {
    await ApiManager.downloadAvatar(currentDentist).then(signedFiles => {

      if (signedFiles !== undefined) {
        console.log(signedFiles);
        setCurrentAvatar(signedFiles);
      }
    });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const getListImages = async () => {
    try {
      const { data }: any = await API.graphql({
        query: listImages,
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      setListImagesData(data.listImages.items);
    } catch (e: any) {
      console.log(e);
    }
  };

  const getListServiceForDentals = async () => {
    const { data }: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    setServices(data.listServiceForDentals.items);
  };

  const saveCrop = (value: any, anchor: any) => {
    setMessageSnackBar('Save crop successfully!');
    setStatusSnackBar('success');
    setOpenSnackBar(true);

    const reader = new FileReader();

    if (anchor === 'left') {
      reader.onload = () => {
        if (currentWatermark) {
          addWaterMark(reader.result as any, setFileLeft, value)
        }
        setFileLeft(value);
        setCheckFilesLeft(true);
      };
      reader.readAsDataURL(value);
    } else {
      reader.onload = () => {
        if (currentWatermark) {
          addWaterMark(reader.result as any, setFileRight, value)
        }
        setFileRight(value);
        setCheckFilesRight(true);
      };
      reader.readAsDataURL(value);
    }
  };

  const saveService = (value: any) => {
    setService(value);
  };

  const disabledButtonFiles = (anchor: any) => {
    if (anchor === 'left') {
      setCheckFilesLeft(false);
    } else {
      setCheckFilesRight(false);
    }
  };

  const checkHandler = ({ target }: any) => {
    if(!checkFilesLeft || !checkFilesRight || !titleBefore || !tagsBefore || !titleAfter ||
      !tagsAfter){
      setOpenSnackBar(true);
      setMessageSnackBar('Please complete all fields in order to upload!');
      setStatusSnackBar('error');
      setCheck(false)
      return
    }
    setCheck(target.checked);
  };

  const onChangeBeforeTitle = (e: any) => {
    setTitleBefore(e.target.value);
  };

  const saveDataUpdate = async () => {
    if (!check) return console.log('I confirm I have full rights for the use and publication of these images.');
    uploadUpdateImage();
    try {
      await API.graphql({
        query: updateImage,
        variables: {
          input: {
            id: updateImg[1].id,
            dentistId: currentDentist.id,
            titleBefore: titleBefore,
            tagsBefore: tagsBefore,
            titleAfter: titleAfter,
            tagsAfter: tagsAfter,
            service: service,
            nameBefore: fileLeft ? fileLeft.name : updateImg[0].nameBefore,
            nameAfter: fileRight ? fileRight.name : updateImg[0].nameAfter
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      setUuid(uuidv4());
      setMessageSnackBar('Success!');
      setStatusSnackBar('success');
      setOpenSnackBar(true);
      if (updateImgEvent) {
        setTimeout(() => {
          handlerShowGallery();
          getListImages();
          setCheck(null);
        }, 1000);
      }
    } catch (error: any) {
      setMessageSnackBar(error);
      setStatusSnackBar('error');
      setOpenSnackBar(true);
    }
  };

  const saveData = async () => {
    setCheckFilesLeft(null);
    setShowServicesPanel(true);
    setCheckFilesRight(null);
    setImagesData(null);
    setOldIMages(null);
    if (updateImgEvent) {
      saveDataUpdate();
      return;
    }
    if (!check) return console.log('I confirm I have full rights for the use and publication of these images.');
    uploadImage();
    try {
      await API.graphql({
        query: createImage,
        variables: {
          input: {
            id: uuid,
            dentistId: currentDentist.id,
            titleBefore: titleBefore ? titleBefore : '',
            tagsBefore: tagsBefore ? tagsBefore : '',
            titleAfter: titleAfter ? titleAfter : '',
            tagsAfter: tagsAfter ? tagsAfter : '',
            service: service ? service : '',
            nameBefore: fileLeft.name,
            nameAfter: fileRight.name
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      setUuid(uuidv4());
      setMessageSnackBar('Success!');
      setStatusSnackBar('success');
      setOpenSnackBar(true);
    } catch (error: any) {
      setMessageSnackBar(error);
      setStatusSnackBar('error');
      setOpenSnackBar(true);
    }
  };

  const uploadUpdateImage = () => {
    const files = [fileRight, fileLeft];
    files.forEach((file: any, key: any) => {
      try {
        Storage.put('images/' + currentDentist.id + '/' + updateImg[key].id + '/' + file.name, file, {
          contentType: 'image/png'
        }).then(result => {
          handlerShowGallery();
          getListImages();
          setMessageSnackBar('Success update!');
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
    });
  };

  const uploadImage = () => {
    const files = [fileLeft, fileRight];
    files.forEach((file: any) => {
      try {
        Storage.put('images/' + currentDentist.id + '/' + uuid + '/' + file.name, file, {
          contentType: 'image/png'
        }).then((result) => {
          console.log('result', result);
          handlerShowGallery();
          getListImages();
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
    });
  };

  const addWaterMark = (e: string | ArrayBuffer | null, setWatermark: (arg0: any) => void, image: any) => {
    watermark([e, currentWatermark])
      .blob(watermark.image.upperRight(0.5))
      .then((img: any) => {
        img.lastModifiedDate = image.lastModifiedDate
        img.name = image.name
        setWatermark(img);
        console.log(img);
      });
  };

  const downloadImages = async () => {
    setImagesData(null);
    setOldIMages(null);
    try {
      if (currentDentist === null) return;
      let allImages: any[] = [];
      let filesList = listImagesData.map(async (e: any) => {
        const files = await Storage.list('images/' + currentDentist.id + '/' + e.id);
        let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key));
        signedFiles = await Promise.all(signedFiles);
        return signedFiles.map((f: any, key: string | number) => {
          const amazon = f.split('amazonaws.com');
          return {
            id: e.id,
            dentistId: e.dentistId,
            url: f,
            original: amazon[0] + 'amazonaws.com/public/' + files[key].key,
            thumbnail: amazon[0] + 'amazonaws.com/public/' + files[key].key,
            name: files[key].key,
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            isSelected: false,
            titleBefore: e.titleBefore,
            originalAlt: e.titleBefore,
            tagsBefore: e.titleBefore,
            titleAfter: e.titleAfter,
            tagsAfter: e.tagsAfter,
            service: e.service,
            nameBefore: e.nameBefore,
            nameAfter: e.nameAfter,
            bulletOnClick: (item: any, itemIndex: any, currentIndex: any) => {
              return { item, itemIndex, currentIndex };
            }
          };
        });
      });
      filesList = await Promise.all(filesList);
      filesList.forEach((item: string | any[]) => {
        if (item.length !== 0) {
          allImages.push(item);
        }
      });
      setTimeout(() => {
        setImagesData(allImages);
        setOldIMages(allImages);
      }, 1000);

    } catch (e) {
      return <Error statusCode={404} />;
    }
  };

  const handlerShowUloadGallery = () => {
    setShowUloadGallery(true);
    setShowServicesPanel(false);
    setUpdateService(null);
    setTitleBefore(null);
    setTagsBefore(null);
    setTitleAfter(null);
    setTagsAfter(null);
    setUpdateImg(null);
    setService(null);
  };

  const handlerShowGallery = () => {
    setUpdateImgEvent(false);
    setShowUloadGallery(false);
    setCheck(false);
    setShowServicesPanel(true);
  };

  const editGallery = (val: any) => {
    setShowUloadGallery(true);
    setUpdateImgEvent(true);
    setShowServicesPanel(false);
    setUpdateImg(val);
    setTitleBefore(val[1].titleBefore ? val[1].titleBefore : '');
    setTagsBefore(val[1].tagsBefore ? val[1].tagsBefore : '');
    setTitleAfter(val[1].titleAfter ? val[1].titleAfter : '');
    setTagsAfter(val[1].tagsAfter ? val[1].tagsAfter : '');
    setService(val[1].service);
    setUpdateService(val[1].service);
  };

  const filterImagesByService = (e: { target: { value: string; }; }) => {
    setImagesData(null);
    if (e.target.value === 'All Service') {
      getListImages();
    }else{
      let newListImages: any[] = [];
      let filterImages: any[] = [];
      oldIMages.forEach((slider: any) => {
        const c: any[] = slider[0].service.replace(/[\])}[{(]/g, '').split(', ');
        c.forEach((item: any) => {
          if (item === e.target.value) {
            filterImages.push(slider);
          }
        })
        return filterImages;
      });
      filterImages.forEach((arr: any) => {
        if (arr.length !== 0) {
          newListImages.push(arr);
        }
      });
      setImagesData(newListImages);
    }
  };

  const searchImagesByTitle = async (e: any) => {
    setImagesData(null);
    setSearchValue(e);
    let allImages: any[] = [];
    let result = oldIMages.map(async (item: any) => {
      if (item[0].tagsBefore.toLowerCase().indexOf(e) === 0) {
        return item;
      }

    });
    result = await Promise.all(result);
    result.forEach((item: string | any[]) => {
      if (item !== undefined) {
        allImages.push(item);
      }
    });
    setImagesData(allImages);
  };

  const handlerWaterMarkImage = (file: any) => {
    setCurrentWatermark(file)
    console.log(file);
  }

  const fullName = currentDentist && `${currentDentist.firstName ? currentDentist.firstName : ''} ${currentDentist.lastName ? currentDentist.lastName : ''}`;

  if (error) return false;

  if (!currentDentist) return <WrapperFlex><CircularProgress size={120} /></WrapperFlex>;

  return (
    <>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={()=>{setOpenSnackBar(false)}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={()=>{setOpenSnackBar(false)}}
               severity={statusSnackBar as any}>
          {messageSnackBar}
        </Alert>
      </Snackbar>
      {signedInUser &&
      <Layout title='Gallery' active={'activeGallery'} currentAvatar={currentAvatar} currentDentist={currentDentist}>
        <div className='main-profile bg-white '>
          {!showUloadGallery && <div className='profile-box-form'>
            <div className='form-info-block'>
              <div>
                <p className='form-login-title green px20'>Gallery</p>
                <p className='form-login-subtitle gray px12 mb-6px'>Add and edit your portfolio</p>
              </div>
            </div>
            <div className='search-gallery'>
              <input className='search-users'
                     type='search'
                     id='search'
                     name='search'
                     value={searchValue}
                     onChange={e => searchImagesByTitle(e.target.value)}
                     placeholder='Search Images' />
              <img className='search-button' src='../../images/search.svg' alt='search' />
              <button className='button-green centered' onClick={handlerShowUloadGallery}>Upload to gallery</button>
            </div>
          </div>}
          {showServicesPanel && oldIMages && oldIMages.length !== 0 && <div className='flex-end'>
            <select className='gallery-select arrows bg-gray' name='services' id='services'
                    onChange={filterImagesByService}>
              <option value='All Service'>All Service</option>
              {
                currentDentist && currentDentist.services.items.map((el: any, key: any) => {
                  return (
                    <option key={key} value={el.name}>{el.name}</option>
                  );
                })
              }
            </select>
          </div>}
          {!imagesData && <WrapperFlex><CircularProgress size={120} /></WrapperFlex>}
          {Array.isArray(imagesData) &&
          <>
            {imagesData.length === 0 && !showUloadGallery &&
            <div className='flex-align-center'>
              <p className='index-leftmenu-text'>Dr {fullName} has not uploaded any of their work yet, please check back later.</p>
            </div>}
            {// @ts-ignore
              imagesData.length > 0 &&

              <div className='gallery-box'>
                {!showUloadGallery && imagesData && imagesData.map((val: any[], key: any) => {

                  return (
                    <div key={key}>
                      <Gallery
                        // @ts-ignore
                        imagesData={val}
                        currentWatermark={currentWatermark}
                        editGallery={editGallery}
                        downloadImages={downloadImages}
                      />
                    </div>
                  );
                })}
              </div>
            }
          </>}
          {showUloadGallery && <>
            <div className='row-gallery'>
              <div className='profile-box-form cut-block'>
                <div className='form-info-block one-block'>
                  <div>
                    <p className='form-login-title green px20'>Upload Before Image</p>
                    <p className='form-login-subtitle gray px12 mb-6px'>Add and edit your images</p>
                  </div>
                </div>
                <div className='profile-block-box'>
                  <UploadImage
                    saveCrop={saveCrop}
                    disabledButtonFiles={disabledButtonFiles}
                    anchor='left'
                    updateImg={updateImg && updateImg[0].original}
                    updateImgData={updateImg && updateImg[0]}
                    nameUpdateImg={updateImg && updateImg[0].nameBefore}
                  />
                  <div>
                    <p className='form-profile-label'>Title</p>
                    <p>
                      <input className='form-profile-input'
                             type='text'
                             name='title'
                             id='title'
                             value={titleBefore ? titleBefore : ''}
                             placeholder='Image Title'
                             onChange={(e) => setTitleBefore(e.target.value)}
                      />
                    </p>
                  </div>
                  <div>
                    <p className='form-profile-label'>Alt Tags</p>
                    <p>
                      <input className='form-profile-input'
                             type='text'
                             name='tags'
                             id='tags'
                             value={tagsBefore}
                             placeholder='Alt Tag'
                             onChange={(e) => setTagsBefore(e.target.value)}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className='profile-box-form cut-block'>
                <div className='form-info-block one-block'>
                  <div>
                    <p className='form-login-title green px20'>Upload After Image</p>
                    <p className='form-login-subtitle gray px12 mb-6px'>Add and edit your images</p>
                  </div>
                </div>
                <div className='profile-block-box'>
                  <UploadImage
                    saveCrop={saveCrop}
                    disabledButtonFiles={disabledButtonFiles}
                    anchor='rigth'
                    updateImg={updateImg && updateImg[1].original}
                    updateImgData={updateImg && updateImg[1]}
                    nameUpdateImg={updateImg && updateImg[1].nameAfter}
                  />
                  <div>
                    <p className='form-profile-label'>Title</p>
                    <p>
                      <input className='form-profile-input'
                             type='text'
                             name='title'
                             id='title'
                             value={titleAfter}
                             placeholder='Image Title'
                             onChange={(e) => setTitleAfter(e.target.value)}
                      />
                    </p>
                  </div>
                  <div>
                    <p className='form-profile-label'>Alt Tags</p>
                    <p>
                      <input className='form-profile-input'
                             type='text'
                             name='tags'
                             id='tags'
                             value={tagsAfter}
                             placeholder='Alt Tag'
                             onChange={(e) => setTagsAfter(e.target.value)}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className='profile-box-form cut-block'>
                <div className='form-info-block one-block'>
                  <div>
                    <p className='form-login-title green px20'>Upload WaterMark Image</p>
                    <p className='form-login-subtitle gray px12 mb-6px'>Add and edit your images</p>
                  </div>
                </div>
                <div className='profile-block-box'>
                  <WaterMarkUpload handlerWaterMarkImage={handlerWaterMarkImage}/>
                  <div className='image' id='exp' />
                </div>
              </div>
            </div>
            <div className='row-gallery'>
              <div className='profile-box-form cut-block-2'>
                <div className='profile-block-box'>
                  <div>
                    <p className='form-profile-label'>
                      <label className='form-profile-label'>Service</label>
                    </p>
                    <div className='row-content space-between'>
                      {services &&
                      <Services saveService={saveService} services={currentDentist.services.items}
                                updateService={updateService} />}
                      {/*<img className='gallery-select-arrow' src='../../../public/images/down-select.png'*/}
                      {/*     alt='select' />*/}
                      <p className='checkbox'>
                        <input type='checkbox' name='delete' id='delete'
                               checked={check}
                               onChange={checkHandler} />
                        <span className='gallery-checkbox-text'>I confirm I have full rights for the use and publication of these images.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='gallery-button-block'>
                <p className='form-login-buttons'>
                  <button className='button-green' onClick={saveData}
                          disabled={!checkFilesLeft || !checkFilesRight || !titleBefore || !tagsBefore || !titleAfter ||
                          !tagsAfter || !check}
                  >Confirm
                  </button>
                </p>
                <p className='form-login-buttons'>
                  <button className='button-green-outline'
                          onClick={handlerShowGallery}>Cancel
                  </button>
                </p>
              </div>
            </div>
          </>
          }
        </div>
      </Layout>}
    </>
  );
};

export default GalleryPage;

export async function getServerSideProps({ req }: any) {
  const { Auth, API } = withSSRContext({ req });
  try {
    const dentist = await Auth.currentAuthenticatedUser();
    const  response  = await API.graphql({
      query: getDentist,
      variables: {
        id: dentist.attributes.sub
      },
      authMode: 'AWS_IAM'
    });
    if (response.data.getDentist) {
      return {
        props: {
          dentist: response.data.getDentist,
          error: false,
        },
      };
    } else {
      return {
        props: {
          error: false,
        },
      };
    }
  } catch (err) {
    return {
      props: {
        error: true,
      },
    };
  }
};
