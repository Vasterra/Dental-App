import React, { useEffect, useState } from 'react';
import { Auth, Storage, withSSRContext } from 'aws-amplify';
import Router, { useRouter } from 'next/router';

import Layout from 'src/components/Layout';
import AddSettings from 'src/components/Dentist/Profile/settings/AddSettings';
import Location from 'src/components/Dentist/Profile/settings/Location';
import Services from 'src/components/Dentist/Profile/settings/Services';
import DisplayPhotos from 'src/components/Dentist/Profile/settings/DisplayPhotos';
import ApiManager from 'src/services/ApiManager';
import { Snackbar } from '@material-ui/core';
import { getDentist } from 'src/graphql/queries';
import { GetServerSideProps } from 'next';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Profile = ({ dentist }: any) => {
  const router = useRouter();

  const [currentDentist, setCurrentDentist] = useState(dentist);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [signedInUser, setSignedInUser] = useState(false);
  const [route, setRoute] = useState('');
  const [adminSettingSubscriber, setAdminSettingSubscriber] = useState();
  const [userName, setUserName] = useState();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if (router.query.slug !== undefined) {
      const { slug } = router.query;
      setRoute(slug[0]);
      void authListener().then(() => {
        downloadAvatar(currentDentist);
        void getAdminSettingSubscriber().then((item: React.SetStateAction<undefined>) => setAdminSettingSubscriber(item));
      });

    }
  }, [router]);

  const getAdminSettingSubscriber = () => {
    return ApiManager.GET_ADMIN_SETTINGS_SUBSCRIBER();
  };

  const authListener = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
    } catch (e: any) {
      void await Router.push('/login');
    }
  };

  const downloadAvatar = (currentDentist: any) => {
    void ApiManager.downloadAvatar(currentDentist).then(signedFiles => {
      if (signedFiles !== undefined) {
        setCurrentAvatar(signedFiles);
      }
    });
  };

  const uploadAvatar = async (files: any) => {
    files.preventDefault();
    try {
      const file = files.target.files[0];
      const filename = file.name.split('.');
      await Storage.put('avatars/' + currentDentist.id + '/' + 'avatar.' + filename[filename.length - 1], file, {
        level: 'public',
        contentType: 'image/png'
      }).then(async (result: any) => {
        let signedFiles: any = Storage.get(result.key);
        signedFiles = await signedFiles.then((item: any) => {
          return item;
        });
        setMessageSnackbar('The avatar upload successfully!');
        setSeverity('success');
        setOpenSnackbar(true);
        setCurrentAvatar(signedFiles);
        downloadAvatar(currentDentist);
      })
      .catch((_error: any) => {
        setMessageSnackbar('The avatar was not uploaded!');
        setSeverity('warning');
        setOpenSnackbar(true);
      });
    } catch (error: any) {
      setMessageSnackbar(`Error uploading file: ${error}`);
      setSeverity('warning');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  console.log(signedInUser);
  return (
    <>
      {currentDentist && signedInUser &&
      <Layout title='Profile' active={'activeProfile'} currentAvatar={currentAvatar} currentDentist={currentDentist} userName={userName}>
        <div className='main-profile bg-white '>
          <AddSettings route={route}
                       adminSettingSubscriber={adminSettingSubscriber}
                       setUserName={setUserName}
                       setMessageSnackbar={setMessageSnackbar}
                       setOpenSnackbar={setOpenSnackbar}
                       setSeverity={setSeverity}
          />
          <Location route={route}
                    adminSettingSubscriber={adminSettingSubscriber}
                    setMessageSnackbar={setMessageSnackbar}
                    setOpenSnackbar={setOpenSnackbar}
                    setSeverity={setSeverity}
          />
          <Services route={route}
                    adminSettingSubscriber={adminSettingSubscriber}
                    setMessageSnackbar={setMessageSnackbar}
                    setOpenSnackbar={setOpenSnackbar}
                    setSeverity={setSeverity}
          />
          <DisplayPhotos currentDentist={currentDentist}
                         currentAvatar={currentAvatar}
                         uploadAvatar={uploadAvatar}
          />
        </div>
      </Layout>}
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}
          // @ts-ignore
               severity={severity}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </>
  );
};


// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { API } = withSSRContext(context);
  let dentistData;
  try {
    if (context.params.slug[0] === null) return;
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
      dentist: dentistData ? dentistData.data.getDentist : null
    }
  };
};

export default Profile;