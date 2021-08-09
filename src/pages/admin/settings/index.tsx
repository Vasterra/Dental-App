import React, { useState } from 'react';
import Menu from 'src/components/menu';
import Details from 'src/components/settings/details';
import Services from 'src/components/settings/services';
import Subscriber from 'src/components/settings/subscriber';
import Information from 'src/components/settings/information';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const AdminSettings = () => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState();

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <section className='container-profile '>
      <Menu active='Settings' />
      <div className='main-profile bg-white'>
        <Details setOpenSnackbar={setOpenSnackbar} setMessageSnackbar={setMessageSnackbar} setSeverity={setSeverity} />
        <Services />
        <Subscriber />
        <Information />
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default AdminSettings;
