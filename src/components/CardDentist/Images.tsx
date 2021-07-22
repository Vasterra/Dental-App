import React, {useState} from "react";
import styled from "styled-components";
import {Storage} from "aws-amplify";
import ApiManager from "src/services/ApiManager";

const ImageWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 10px;

  @media (max-width: 630px) {
    width: 100%;
  }
`;

const DentistImage = styled("img")`
  display: block;
  width: 100%;
  height: 200px;
`;

const DentistImageBlockEmpty = styled("div")`
  display: block;
  background-color: #0d9da6;
  width: 100%;
  height: 200px;
`;

type Props = {
  data: any,
}

const CardDentistImage: React.FunctionComponent<Props> = ({data}) => {
  const [avatarImg, setAvatarImg] = useState([]);

  React.useEffect(() => {
    ApiManager.downloadAvatar(data).then(signedFiles => {
      setAvatarImg(signedFiles)
    })
  }, []);

  return (
    <ImageWrapper>
      {avatarImg && <DentistImage
        // @ts-ignore
          src={avatarImg} alt="image"/>}
      {!avatarImg && <DentistImageBlockEmpty/>}
    </ImageWrapper>
  )
}

export default CardDentistImage;
