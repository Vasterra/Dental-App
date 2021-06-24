import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import {Auth, Hub, Storage} from 'aws-amplify'
import {Snackbar} from "@material-ui/core";
import {DropzoneDialog} from "material-ui-dropzone";
import {Alert} from "@material-ui/lab";

const AvatarWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF 0 0 no-repeat padding-box;
  padding: 10px;
  height: 100%;
  border-radius: 10px;
  min-width: 250px;
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

const UploadButtonEmpty = styled("span")`{
  position: relative;
  width: 170px;
  cursor: pointer;
  background: #fff;
  height: 37px;
  border-radius: 30px;
  border: 1px solid #0d9da6;
  padding: 8px;
  text-align: center;
  color: #000;

  input[type="file"] {
    -webkit-appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 35px;
    opacity: 0;
    width: 100%;
  }

  &:hover {
    background: #0d9da6;
    color: #fff;
  }
`;

type Props = {
  dentist: any,
  currentAvatar: any,
  downloadAvatar: Function,
  signedInUser: Boolean,
  currentUser: any,
}

const AvatarProfileComponent: React.FunctionComponent<Props> = ({
                                                                  dentist,
                                                                  currentAvatar,
                                                                  downloadAvatar,
                                                                  signedInUser,
                                                                  currentUser
                                                                }) => {
  const [avatarImage, setAvatarImage] = useState();
  const [open, setOpen] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState('');
  const [statusSnackbar, setStatusSnackbar] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setAvatarImage(currentAvatar)
  }, [currentAvatar])

  const Me = dentist.id === currentUser.username;

  async function uploadAvatar(files) {
    const file = files[0];
    const filename = file.name.split('.')
    try {
      await Storage.put('avatars/' + dentist.id + '/' + 'avatar.' + filename[filename.length - 1], file, {
        level: 'public',
        contentType: 'image/png',
      }).then(async (result: any) => {
        let signedFiles: any = Storage.get(result.key)
        signedFiles = await signedFiles.then(item => {
          return item
        })
        setAvatarImage(signedFiles)
        setDownloadMessage('Success!')
        setStatusSnackbar('success')
        setOpenSnackbar(true)
        setOpen(false)
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
    if (avatarImage) {
      return (
        <>
          <DentistAvatar src={avatarImage} alt="avatar"/>
          <UploadButtonEmpty onClick={handleOpen}>
            Change Avatar
          </UploadButtonEmpty>
          <DropzoneDialog
            open={open}
            onSave={uploadAvatar}
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
          <DentistAvatarBlockEmpty/>
          <UploadButtonEmpty onClick={handleOpen}>
            Upload Avatar
          </UploadButtonEmpty>
          <DropzoneDialog
            open={open}
            onSave={uploadAvatar}
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
    console.log(avatarImage)
    return <>
      { !avatarImage && <DentistAvatarBlockEmpty/> }
      { avatarImage && <DentistAvatar src={avatarImage} alt="avatar"/> }
    </>
  }

  return (
    <AvatarWrapper>
      {!Me && <DentistPhotoWithoutMe/>}
      {Me && <DentistPhotoMe/>}
      <DentistInfoName>{dentist.firstName}</DentistInfoName>
      <DentistInfoEmail>{dentist.email}</DentistInfoEmail>
    </AvatarWrapper>
  )
}

export default AvatarProfileComponent
