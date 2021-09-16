import React, { useEffect, useState } from 'react';
import ApiManager from 'src/services/ApiManager';
import {
  CircularProgress,
  createStyles,
  Grid, Snackbar,
  Switch,
  SwitchClassKey,
  SwitchProps,
  Theme,
  withStyles
} from '@material-ui/core';
import { IAdminSettingsSubscribers } from '../../types/types';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 90,
      height: 30,
      padding: 0
    },
    switchBase: {
      padding: 3,
      '&$checked': {
        transform: 'translateX(56px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#095c5c',
          opacity: 1,
          border: 'none'
        }
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff'
      }
    },
    thumb: {
      width: 24,
      height: 24
    },
    track: {
      borderRadius: 36 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border'])
    },
    checked: {},
    focusVisible: {}
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
});

const Subscriber = () => {

  const [adminSettingsSubscriber, setAdminSettingsSubscriber] = useState<IAdminSettingsSubscribers>();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState<'error' | 'info' | 'success' | 'warning'>();

  useEffect(() => {
    void createAdminSettingsSubscriber();
  }, []);

  const createAdminSettingsSubscriber = async () => {
    await ApiManager.GET_ADMIN_SETTINGS_SUBSCRIBER().then(result => {
      setAdminSettingsSubscriber(result);
    });
  };

  const handleChange = async (name: any, value: any, fullName: any) => {
    setAdminSettingsSubscriber({
      createdAt: '',
      freeAppearVerified: false,
      freeMaxLocations: '',
      freeMaxServices: '',
      freePhoneNumber: false,
      freeWebsiteAddress: false,
      id: '',
      owner: '',
      paidAppearVerified: false,
      paidMaxLocations: '',
      paidMaxServices: '',
      paidPhoneNumber: false,
      paidWebsiteAddress: false,
      updatedAt: '', ...adminSettingsSubscriber, [name]: value });
    try {
      await ApiManager.updateAdminSettingsSubscribers({ ...adminSettingsSubscriber, [name]: value }).then(() => {
        setMessageSnackbar(`${fullName} ${value === true || value === false ? value ? 'on' : 'off' : 'count ' + value}`);
        setSeverity('success');
        setOpenSnackbar(true);
      })
    } catch (error: any) {
      setMessageSnackbar(error);
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

  return (
    <div className='profile-box-form'>
      {!adminSettingsSubscriber && <div className='flex-wrapper'><CircularProgress size={120} /></div>}
      {adminSettingsSubscriber && <div className='form-info-block-paid'>
        <div>
          <p className='form-login-title green px20'>Paid Subscriber</p>
          <p className='form-login-subtitle gray px12 mb-6px'>Set Limits</p>
          <div className='profile-block-box'>
            <div className='double-blocks-3'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Max Locations</label>
                </p>
                <p>
                  <input className='form-profile-input'
                         type='number'
                         name='paidMaxLocations'
                         id='paidMaxLocations'
                         value={adminSettingsSubscriber.paidMaxLocations}
                         onChange={(e) => handleChange(e.target.name, e.target.value, 'Paid Max Locations')}
                  />
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Max Services</label>
                </p>
                <p>
                  <input className='form-profile-input'
                         type='number'
                         name='paidMaxServices'
                         id='paidMaxServices'
                         value={adminSettingsSubscriber.paidMaxServices}
                         onChange={(e) => handleChange(e.target.name, e.target.value, 'Paid Max Services')}
                  />
                </p>
              </div>
              <div/>
            </div>
            <div className='double-blocks-3'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Website Address</label>
                </p>
                <p>
                  <Grid item>
                    <AntSwitch checked={adminSettingsSubscriber.paidWebsiteAddress}
                               onChange={(e) => handleChange(e.target.name, e.target.checked, 'Paid Website Address')}
                               name='paidWebsiteAddress'
                    />
                  </Grid>
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Phone Number</label>
                </p>
                <p>
                  <Grid item>
                    <AntSwitch checked={adminSettingsSubscriber.paidPhoneNumber}
                               onChange={(e) => handleChange(e.target.name, e.target.checked, 'Paid Phone Number')}
                               name='paidPhoneNumber'
                    />
                  </Grid>
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Appear Verified</label>
                </p>
                <p>
                  <Grid item>
                    <AntSwitch checked={adminSettingsSubscriber.paidAppearVerified}
                               onChange={(e) => handleChange(e.target.name, e.target.checked, 'Paid Appear Verified')}
                               name='paidAppearVerified'
                    />
                  </Grid>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className='form-login-title green px20'>Free Subscriber</p>
          <p className='form-login-subtitle gray px12 mb-6px'>Set Limits</p>
          <div className='profile-block-box'>
            <div className='double-blocks-3'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Max Locations</label>
                </p>
                <p>
                  <input className='form-profile-input'
                         type='number'
                         name='freeMaxLocations'
                         id='freeMaxLocations'
                         value={adminSettingsSubscriber.freeMaxLocations}
                         onChange={(e) => handleChange(e.target.name, e.target.value, 'Free Max Locations')}
                  />
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Max Services</label>
                </p>
                <p>
                  <input className='form-profile-input'
                         type='number'
                         name='freeMaxServices'
                         id='freeMaxServices'
                         value={adminSettingsSubscriber.freeMaxServices}
                         onChange={(e) => handleChange(e.target.name, e.target.value, 'Free Max Services')}
                  />
                </p>
              </div>
              <div/>
            </div>
            <div className='double-blocks-3'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Website Address</label>
                </p>
                <p>
                  <Grid item>
                    <AntSwitch checked={adminSettingsSubscriber.freeWebsiteAddress}
                               onChange={(e) => handleChange(e.target.name, e.target.checked, 'Free Website Address')}
                               name='freeWebsiteAddress'
                    />
                  </Grid>
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Phone Number</label>
                </p>
                <p>
                  <Grid item>
                    <AntSwitch checked={adminSettingsSubscriber.freePhoneNumber}
                               onChange={(e) => handleChange(e.target.name, e.target.checked, 'Free Phone Number')}
                               name='freePhoneNumber'
                    />
                  </Grid>
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Appear Verified</label>
                </p>
                <p>
                  <Grid item>
                    <AntSwitch checked={adminSettingsSubscriber.freeAppearVerified}
                               onChange={(e) => handleChange(e.target.name, e.target.checked, 'Free Appear Verified')}
                               name='freeAppearVerified'
                    />
                  </Grid>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>}
      <Snackbar open={openSnackbar} autoHideDuration={1000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}
               severity={severity}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Subscriber;

