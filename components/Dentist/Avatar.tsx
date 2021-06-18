import React, {Component, useState} from "react";
import styled from "styled-components";
import {Auth, Storage} from 'aws-amplify'
import {CircularProgress} from "@material-ui/core";
import {PhotoPicker} from "aws-amplify-react";
const AvatarWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF 0 0 no-repeat padding-box;
  padding: 10px;
  height: 100%;
  border-radius: 10px;
  min-width: 200px;

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
  dentist: any,
}

const AvatarProfileComponent: React.FunctionComponent<Props> = ({dentist}) => {
  const [images, setImages] = useState('');
  const [percent, setPercent] = useState(0);
  const [imagePreview, setImagePreview] = useState();

  async function uploadAvatar(e) {
    const user = await Auth.currentAuthenticatedUser();
    const file = e.target.files[0];
    try {
      const result = await Storage.put('avatars/' + user.attributes.sub + '/' + file.name, file, {
        contentType: 'image/png',
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          const percentUploaded: number = Math.round((progress.loaded / progress.total) * 100)
          setPercent(percentUploaded)
        },
      });
      const { key }: any = result
      setImagePreview(key)
      console.log(result)
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }
  return (
    <AvatarWrapper>
      {imagePreview && (
        <DentistAvatar src={imagePreview} alt="avatar"/>
      )}
      {/*<PhotoPicker*/}
      {/*  title="Avatar"*/}
      {/*  preview="hidden"*/}
      {/*  onload={url : any => setImagePreview(url)}*/}
      {/*/>*/}
      <input
        type="file"
        onChange={uploadAvatar}
      />
      {/*<DentistInfoName>{displayName}</DentistInfoName>*/}
      {/*<DentistInfoEmail>{data.email}</DentistInfoEmail>*/}
    </AvatarWrapper>
  )
}

export default AvatarProfileComponent
