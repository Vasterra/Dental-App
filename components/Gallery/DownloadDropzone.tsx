import React, {useState} from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {Storage} from "aws-amplify";

type Props = {
  downloadImages: Function,
  dentist: any
}

const DownloadDropzone: React.FunctionComponent<Props> = ({downloadImages, dentist}): any => {

  const [open, setOpen] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState('');
  const [statusSnackbar, setStatusSnackbar] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [percent, setPercent] = useState(0);

  const handleClose = () => {
    setOpen(false)
  }
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  async function uploadImage(files: any[]) {
    const file = files[0];
    try {
      await Storage.put('images/' + dentist.id + '/' + file.name, file, {
        contentType: 'image/png',
        progressCallback(progress: { loaded: number; total: number; }) {
          const percentUploaded: number = Math.round((progress.loaded / progress.total) * 100)
          setPercent(percentUploaded)
        },
      }).then(result => {
        setDownloadMessage('Success!')
        setStatusSnackbar('success')
        setOpenSnackbar(true)
        setOpen(false)
        downloadImages()
        handleClose()
      })
        .catch((_error: any) => {
          setDownloadMessage('File upload error')
          setStatusSnackbar('error')
          setOpenSnackbar(true)
        });
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <button className="search-button" onClick={handleOpen}>
        Upload New Image
      </button>
      <DropzoneDialog
        open={open}
        onSave={uploadImage}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          variant="filled"
          // @ts-ignore
          severity={statusSnackbar}
        >
          {downloadMessage}
        </Alert>
      </Snackbar>
      <style jsx>{`
        .search-button {
          width: 100%;
          cursor: pointer;
          background: #fff;
          height: 47px;
          border-radius: 30px;
          border: 1px solid #0d9da6;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          color: #000;
        }

        .search-button:hover {
          background: #0d9da6;
          color: #fff;
        }
      `}</style>
    </>
  )
}

export default DownloadDropzone