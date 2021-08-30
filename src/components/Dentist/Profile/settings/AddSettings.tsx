import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { API, Auth } from 'aws-amplify';
import Router from 'next/router';
import DentistProfileInput from 'src/components/Dentist/Profile/componentForm/Input';
import DentistProfileArea from 'src/components/Dentist/Profile/componentForm/TextArea';
import { updateDentist } from 'src/graphql/mutations';
import ApiManager from '../../../../services/ApiManager';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

const useStylesFacebook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      marginBottom: '27px'
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
    },
    top: {
      color: '#1a90ff',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0
    },
    circle: {
      strokeLinecap: 'round'
    }
  })
);

function FacebookCircularProgress(props: CircularProgressProps) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant='indeterminate'
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle
        }}
        size={30}
        thickness={4}
        {...props}
      />
    </div>
  );
}

type Props = {
  route: any,
  setUserName: any,
  adminSettingSubscriber: any,
  setMessageSnackbar: any,
  setOpenSnackbar: any,
  setSeverity: any,
}

const AddSettings: React.FunctionComponent<Props> = ({
   route,
   adminSettingSubscriber,
   setMessageSnackbar,
   setOpenSnackbar,
   setSeverity,
   setUserName
  }) => {

  const [currentDentist, setCurrentDentist] = useState<any | null>(null);
  const [loaderButtonSubmit, setLoaderButtonSubmit] = useState<any | null>(null);

  useEffect(() => {
    if (route !== undefined) void getDentist();
  }, [route]);

  const getDentist = async () => {
    return await ApiManager.GET_DENTIST(route).then((result: any) => {
      setCurrentDentist(result.data.getDentist);
      setLoaderButtonSubmit(false);
    });
  };

  return (
    <>
      <div className='profile-box-form'>
        <div className='form-info-block'>
          <div><p className='form-login-title green px20'>Bio and Contact Information</p>
            <p className='form-login-subtitle gray px12 mb-6px'>Information For Patients</p>
          </div>
          {currentDentist && !currentDentist.hasPaidPlan && <p className='form-login-buttons'>
            <button className='button-green-outline' onClick={() => {
              void Router.push(`../../dentist/account/${currentDentist.id}`);
            }}>Upgrade
            </button>
          </p>}
        </div>
        {currentDentist &&
        <Formik
          onSubmit={async (data: any) => {
            setLoaderButtonSubmit(true);
            await fetch(`https://maps.google.com/maps/api/geocode/json?sensor=false&address=${data.address}&key=AIzaSyDMYrZZhMGlK5PKOMQRQMVffXnUJwgyatY`)
            .then(response => response.json())
            .then(async (result) => {
              data.lng = result.results[0].geometry.location.lng;
              data.lat = result.results[0].geometry.location.lat;

              const user = await Auth.currentAuthenticatedUser();
              await Auth.updateUserAttributes(user, {
                'email': data.email
              });
              setUserName(data.firstName);
              console.log(data);
              try {
                await API.graphql({
                  query: updateDentist,
                  variables: {
                    input: data
                  },
                  // @ts-ignore
                  authMode: 'AWS_IAM'
                });
                setMessageSnackbar('The information was updated successfully!');
                setSeverity('success');
                setOpenSnackbar(true);
              } catch (err: any) {
                setMessageSnackbar('The information has not been updated!');
                setSeverity('warning');
                setOpenSnackbar(true);
              }
              await getDentist();
            })
            .catch((error: any) => {
              setMessageSnackbar(error);
              setSeverity('warning');
              setOpenSnackbar(true);
            });

          }}
          initialValues={{
            id: currentDentist.id,
            firstName: currentDentist.firstName,
            lastName: currentDentist.lastName,
            bio: currentDentist.bio,
            email: currentDentist.email,
            website: currentDentist.website,
            city: currentDentist.city,
            street: currentDentist.street,
            address: currentDentist.address,
            postIndex: currentDentist.postIndex,
            phone: currentDentist.phone,
            qualifications: currentDentist.qualifications
          }}
        >
          {props => (
            <form onSubmit={props.handleSubmit} style={{ width: '100%' }}>
              <div className='box-2-box'>
                <div className='profile-block-box'>
                  <div className='double-blocks'>
                    <DentistProfileInput
                      title='Title'
                      name='lastName'
                      placeholder='Dr.'
                      setValue=''
                      props={props}
                    />
                    <DentistProfileInput
                      title='Name'
                      name='firstName'
                      placeholder='John Smith'
                      setValue={props.values.firstName}
                      props={props}
                    />
                  </div>
                  <div>
                    <DentistProfileInput
                      title='Contact Email'
                      name='email'
                      placeholder='John.smith@dental.co.uk'
                      setValue={props.values.email}
                      props={props}
                    />
                  </div>
                  <div>
                    <DentistProfileInput
                      title='Qualifications'
                      name='qualifications'
                      placeholder=''
                      setValue={props.values.qualifications}
                      props={props}
                    />
                  </div>
                  <div>
                    <DentistProfileArea
                      title='Profile Bio'
                      name='bio'
                      placeholder='Profile Bio'
                      setValue={props.values.bio}
                      props={props}
                    />
                  </div>
                  {!currentDentist.hasPaidPlan && <p className='form-login-buttons'>
                    <button className='button-green' type='submit'>{loaderButtonSubmit ?
                      <FacebookCircularProgress /> : 'Confirm'}</button>
                  </p>}
                </div>
                {adminSettingSubscriber && !currentDentist.hasPaidPlan && <div className='profile-block-box'>
                  <div
                    className={currentDentist.hasPaidPlan ? adminSettingSubscriber.paidWebsiteAddress : adminSettingSubscriber.freeWebsiteAddress ? '' : 'disabled'}>
                    <p className='form-profile-label'>
                      <label className='form-profile-label' htmlFor='website'>Website Address - Premium</label>
                    </p>
                    <p>
                      <input className='form-profile-input'
                             type='text'
                             name='website'
                             id='website'
                             value={props.values.website}
                             placeholder='dental.co.uk'
                             disabled={currentDentist.hasPaidPlan ? !adminSettingSubscriber.paidWebsiteAddress : !adminSettingSubscriber.freeWebsiteAddress}
                      />
                    </p>
                  </div>
                  <div
                    className={currentDentist.hasPaidPlan ? adminSettingSubscriber.paidPhoneNumber : adminSettingSubscriber.freePhoneNumber ? '' : 'disabled'}>
                    <p className='form-profile-label'>
                      <label className='form-profile-label' htmlFor='phone'>Phone - Premium</label>
                    </p>
                    <p>
                      <input className='form-profile-input'
                             type='text'
                             name='phone'
                             id='phone'
                             value={props.values.phone}
                             placeholder='0203 123 4567'
                             disabled={currentDentist.hasPaidPlan ? !adminSettingSubscriber.paidPhoneNumber : !adminSettingSubscriber.freePhoneNumber}
                      />
                    </p>
                  </div>
                </div>}
                {currentDentist.hasPaidPlan && <div className='profile-block-box'>
                  <DentistProfileInput
                    title='Website Address'
                    name='website'
                    placeholder='dental.co.uk'
                    setValue={props.values.website}
                    props={props}
                  />
                  <DentistProfileInput
                    title='Phone'
                    name='phone'
                    placeholder='0203 123 4567'
                    setValue={props.values.phone}
                    props={props}
                  />
                  <DentistProfileInput
                    title='Address'
                    name='address'
                    placeholder='London'
                    setValue={props.values.address}
                    props={props}
                  />
                  <p className='form-login-buttons'>
                    <button className='button-green' type='submit'>{loaderButtonSubmit ?
                      <FacebookCircularProgress /> : 'Confirm'}</button>
                  </p>
                </div>}
              </div>
            </form>
          )}
        </Formik>
        }
      </div>
    </>
  );
};

export default AddSettings;
