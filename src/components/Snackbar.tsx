import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

type Props = {
  openSnackBar: any,
  handleCloseSnackbar: any,
  statusSnackBar: any,
  messageSnackBar: any,
}

const Snackbars: React.FunctionComponent<Props> = ({
   openSnackBar,
   handleCloseSnackbar,
   statusSnackBar,
   messageSnackBar
  }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={openSnackBar}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        variant='filled'
        // @ts-ignore
        severity={statusSnackBar}
      >
        {messageSnackBar}
      </Alert>
    </Snackbar>
  );
};

export default Snackbars;