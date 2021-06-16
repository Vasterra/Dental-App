import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import React, {useState} from "react";
import styled from "styled-components";
import {DropzoneDialog} from "material-ui-dropzone";
import {MeComponent} from "../../generated/apolloComponents";
// import AdminDrawer from "../AdminPanel/AdminDrawer";

const AvatarWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
  width: 200px;
  margin-bottom: 10px;

  @media (max-width: 630px) {
    width: 100%;
  }
`;

const DentistAvatar = styled("img")`
  display: block;
  background-color: white;
  width: 150px;
  height: 150px;
  margin: 15px;
  border-radius: 50%;
`;

const DentistAvatarBlockEmpty = styled("div")`
  display: block;
  background-color: #0d9da6;
  width: 150px;
  height: 150px;
  margin: 15px;
  border-radius: 50%;
  border: 1px solid #0d9da6;
`;

const DentistInfoName = styled('div')`
  padding: 15px 0 5px;
  font-size: 18px;
  font-weight: bold;
`;

const DentistInfoEmail = styled("div")`
  font-size: 12px;
  padding: 15px;
`;

const UploadButtonEmpty = styled("button")`{
  width: 170px;
  cursor: pointer;
  background: #fff;
  height: 37px;
  border-radius: 30px;
  border: 1px solid #0d9da6;
  align-items: center;
  padding: 0 20px;
  color: #000;

  &:hover {
    background: #0d9da6;
    color: #fff;
  }
`;


type Props = {
  data: any,
}

const AvatarProfileComponent: React.FunctionComponent<Props> = ({data}) => {
  const [open, setOpen] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState('');
  const [statusSnackbar, setStatusSnackbar] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [images, setImages] = useState([]);
  const displayName = `${data.firstName}  ${data.lastName}`

  const getImages = async () => {
    const URL: string = "http://localhost:4000/files/" + data.id + "/avatar/"
    const requestOptions: {} = {
      method: 'GET',
      redirect: 'follow'
    };

    await fetch(URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setImages(result[0].src)
      })
      .catch((_error: any) => {
      })
  }

  React.useEffect(() => {
    getImages()
  }, []);

  const handleSave = async (files: any) => {
    const URL = "http://localhost:4000/uploads-file/" + data.id + "/avatar"
    const formdata = new FormData();
    formdata.append("file", files[0], files[0].name);

    const requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    await fetch(URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        getImages()
        setDownloadMessage(result.message)
        setStatusSnackbar('success')
        setOpenSnackbar(true)
        setOpen(false)
      })
      .catch((_error: any) => {
        setDownloadMessage('File upload error')
        setStatusSnackbar('error')
        setOpenSnackbar(true)
      });
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const DentistPhotoMe = () => {
    if (images.length !== 0) {
      return (
      <>
        {/*// @ts-ignore*/}
        <DentistAvatar src={images} alt="avatar"/>
        <UploadButtonEmpty className="search-button" onClick={handleOpen}>
          Change Avatar
        </UploadButtonEmpty>
        <DropzoneDialog
          open={open}
          onSave={handleSave}
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
      </>
      )
    } else {
      return (
        <>
          {/*// @ts-ignore*/}
          <DentistAvatarBlockEmpty src={images} alt="avatar"/>
          <UploadButtonEmpty className="search-button" onClick={handleOpen}>
            Upload Avatar
          </UploadButtonEmpty>
          <DropzoneDialog
            open={open}
            onSave={handleSave}
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
        </>
      )
    }
  }

  const DentistPhotoWithoutMe = () => {
    if (images.length === 0) {
      return <DentistAvatarBlockEmpty/>
    } else {
      {/*// @ts-ignore*/}
      return <DentistAvatar src={images} alt="avatar"/>
    }
  }

  return (
    <AvatarWrapper>
      <MeComponent>
        {({data, loading}) => {
          if (!data || loading || !data.me) {
            return <DentistPhotoWithoutMe />;
          }
          return <DentistPhotoMe />
        }}
      </MeComponent>
      <DentistInfoName>{displayName}</DentistInfoName>
      <DentistInfoEmail>{data.email}</DentistInfoEmail>
    </AvatarWrapper>
  )
}

export default AvatarProfileComponent
