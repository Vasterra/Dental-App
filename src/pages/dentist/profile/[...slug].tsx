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
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { getDentist } from '../../../graphql/queries';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Profile = ({ dentist, error }: any) => {

  const [currentDentist, setCurrentDentist] = useState<any>(dentist);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [signedInUser, setSignedInUser] = useState(false);
  const [route, setRoute] = useState('');
  const [adminSettingSubscriber, setAdminSettingSubscriber] = useState();
  const [userName, setUserName] = useState();
  const [changeAddress, setChangeAddress] = useState<any>();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    void getCurrentDentist()
    void authListener().then(() => {
      downloadAvatar(currentDentist);
      void getAdminSettingSubscriber().then((item: React.SetStateAction<undefined>) => setAdminSettingSubscriber(item));
    });
  }, []);

  const getCurrentDentist = async () => {
    const dentist = await Auth.currentAuthenticatedUser();
    setRoute(dentist.attributes.sub);
  }

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

  const handleChangeAddress = (value: any) => {
    setChangeAddress(value)
  };

  const uploadAvatar = async (files: any) => {
    files.preventDefault();
    try {
      const file = files.target.files[0];
      await Storage.put('avatars/' + currentDentist.id + '/' + 'avatar.jpg', file, {
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

  if (error) return false;

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
                       handleChangeAddress={handleChangeAddress}
          />
          <Location route={route}
                    adminSettingSubscriber={adminSettingSubscriber}
                    setMessageSnackbar={setMessageSnackbar}
                    setOpenSnackbar={setOpenSnackbar}
                    setSeverity={setSeverity}
                    changeAddress={changeAddress}
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

export default Profile;