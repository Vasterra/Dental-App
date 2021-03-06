import React, { useEffect, useState } from 'react';
import { API, Auth, Storage, withSSRContext } from 'aws-amplify';
import { useRouter } from 'next/router';
import ApiManager from 'src/services/ApiManager';
import ProfileAccountFree from 'src/components/Dentist/PersonPage/profileAccountFree';
import ProfileAccountSubscription from 'src/components/Dentist/PersonPage/profileAccountSubscription';
import Header from 'src/components/Header';
import { getDentist, listImages, listServiceForDentals } from 'src/graphql/queries';
import { CircularProgress } from '@material-ui/core';
import Error from 'next/error';

import { WrapperFlex } from 'src/styles/Main.module';
import { GetServerSideProps } from 'next';
import Footer from '../../../components/Footer';

const Person = ({ dentistData }: any) => {
  const router = useRouter();

  const [adminSettingSubscriber, setAdminSettingSubscriber] = useState();
  const [currentDentist, setCurrentDentist]: any = useState(dentistData);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [signedInUser, setSignedInUser]: any = useState();
  const [currentUser, setCurrentUser]: any = useState();
  const [listImagesData, setListImagesData]: any = useState();
  const [services, setServices]: any = useState();
  const [images, setImages]: any = useState();
  const [oldIMages, setOldIMages]: any = useState();
  const [route, setRoute]: any = useState();
  const [currentCover, setCurrentCover]: any = useState();
  const [useriIsNotAuth, setUseriIsNotAuth]: any = useState();

  useEffect(() => {
    if (router.query.slug !== undefined) {
      const { slug } = router.query;
      setRoute(slug[0]);
      authListener();
      getListImages();
      getListServiceForDentals();
      void getAdminSettingSubscriber().then((item: React.SetStateAction<undefined>) => setAdminSettingSubscriber(item));
    }
  }, [router]);

  useEffect(() => {
    if (currentDentist !== undefined) {
      downloadAvatar(currentDentist);
      downloadCover();
    }
  }, [currentDentist]);

  useEffect(() => {
    if (listImagesData !== undefined) {
      downloadImages();
    }
  }, [listImagesData]);

  const authListener = async () => {
    const signedInUser = ApiManager.authListener();
    setSignedInUser(signedInUser);
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setCurrentUser(currentUser);
      setSignedInUser(true);
    } catch (e: any) {
      console.log(e);
    }
  };

  // const getDentist = async (id: string) => {
  //   await ApiManager.getDentist(route ? route : id)
  //   .then(currentDentist => {
  //     setCurrentDentist(currentDentist);
  //     getListImages();
  //     getListServiceForDentals();
  //   });
  // };

  const downloadAvatar = async (currentDentist: any) => {
    await ApiManager.downloadAvatar(currentDentist).then(signedFiles => {
      if (signedFiles !== undefined) {
        setCurrentAvatar(signedFiles);
      }
    });
  };

  const setFuncImages = (images: any) => {
    setImages(images);
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


  const downloadImages = async () => {
    setImages(null);
    setOldIMages(null);
    try {
      if (currentDentist === null) return;
      let eachImages: any[] = [];
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
            nameAfter: e.nameAfter
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
        setImages(allImages);
        setOldIMages(allImages);
      }, 1000);

    } catch (e: any) {
      return <Error statusCode={404} />;
    }
  };

  const downloadCover = async () => {
    if (!currentDentist) return;
    await ApiManager.downloadCover(currentDentist).then(signedFiles => {
      setCurrentCover(signedFiles[0]);
    });
  };

  const getAdminSettingSubscriber = () => {
    return ApiManager.GET_ADMIN_SETTINGS_SUBSCRIBER();
  };

  if (currentDentist.isDisabled) return <WrapperFlex>
    <div>{useriIsNotAuth}</div>
  </WrapperFlex>;
  if (!currentDentist && !currentDentist.isDisabled) return <WrapperFlex><CircularProgress size={120} /></WrapperFlex>;

  return (
    <>
      <Header />
      {currentDentist && !currentDentist.hasPaidPlan && <ProfileAccountFree
        currentDentist={currentDentist}
        adminSettingSubscriber={adminSettingSubscriber}
        images={images}
        oldIMages={oldIMages}
        services={services}
        currentAvatar={currentAvatar}
        setImages={setFuncImages}
        downloadImages={downloadImages}
      />}
      {currentDentist && currentDentist.hasPaidPlan && <ProfileAccountSubscription
        currentDentist={currentDentist}
        adminSettingSubscriber={adminSettingSubscriber}
        images={images}
        currentCover={currentCover}
        oldIMages={oldIMages}
        services={services}
        currentAvatar={currentAvatar}
        setImages={setFuncImages}
        downloadImages={downloadImages}
      />}
      <Footer />
    </>
  );
};


// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { API } = withSSRContext(context);
  let dentistData;
  try {
    if (context.params.slug[0] === null) return;
    // var randomGeoPoints: any = generateRandomPoints({'lat':55.85, 'lng':37.71}, 2000, 40);
    // dentistData = randomGeoPoints.filter((item: { id: any; }) => item.id == context.params.slug[0])
    dentistData = await API.graphql({
      query: getDentist,
      variables: {
        id: context.params.slug[0]
      },
      authMode: 'AWS_IAM'
    });
  } catch (e: any) {
    console.log(e);
  }
  return {
    props: {
      // dentist: dentistData ? dentistData[0] : null
      dentistData: dentistData ? dentistData.data.getDentist : null
    }
  };
};

export default Person;
