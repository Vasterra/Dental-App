import React, {useState} from "react";
import styled from "styled-components";
import {Storage} from "aws-amplify";

const DentistAvatar = styled("img")`
  display: block;
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const DentistAvatarBlockEmpty = styled("img")`
  display: block;
  background-color: #0d9da6;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #0d9da6;
`;

type Props = {
  data: any,
}

const AvatarDentistComponent: React.FunctionComponent<Props> = ({data}) => {
  const [currentAvatar, setCurrentAvatar] = useState([]);

  React.useEffect(() => {
    downloadAvatar()
  }, []);


  const downloadAvatar = async () => {
    try {
      const files =  await Storage.list('avatars/' + data.id + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      setCurrentAvatar(signedFiles[0])
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  return (
    <>

      {currentAvatar && <DentistAvatar
          // @ts-ignore
          src={currentAvatar} alt="avatar"/>}
      {!currentAvatar && <DentistAvatarBlockEmpty src={"../../../images/empty_avatar"}/>}
    </>
  )
}

export default AvatarDentistComponent
