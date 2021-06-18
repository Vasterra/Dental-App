import React, {useState} from 'react'
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

type Props = {
  me: string
  deleteImage: {}
  getImages: Function
}

const DownloadDropzone: React.FunctionComponent<Props> = ({me, deleteImage, getImages}) => {

  const [downloadMessage, setDownloadMessage] = useState('');
  const [statusSnackbar, setStatusSnackbar] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleImageDelete = async () => {
    const URL = "http://localhost:4000/delete-file/" + me + '/' + deleteImage

    const requestOptions = {
      method: 'POST',
    };

    await fetch(URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        getImages()
        setDownloadMessage(result.message)
        setStatusSnackbar('success')
        setOpenSnackbar(true)
      })
      .catch((_error: any) => {
        setDownloadMessage('File delete error')
        setStatusSnackbar('error')
      });
  }

  return (
    <>
      <button className="search-button" onClick={handleImageDelete}>
        Delete Image
      </button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
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

export default DownloadDropzone;