import React, {useEffect, useState} from "react";
import {Storage} from "aws-amplify";
import styled from "styled-components";
import ApiManager from "src/services/ApiManager";

const DentistImageBlockEmpty = styled("img")`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  opacity: 1;
`;

type Props = {
  dentist: any,
}

const AvatarForMapComponent: React.FunctionComponent<Props> = ({dentist}) => {
  const [images, setImages]: any = useState();

  // @ts-ignore
  useEffect(() => {
    let cleanupFunction = false;
    try {
      ApiManager.downloadAvatar(dentist).then(signedFiles => {
        if (!cleanupFunction) setImages(signedFiles)
      })
    } catch (error: any) {
      console.error(error.message);
    }
    return () => cleanupFunction = true;
  }, []);

  return (
    <>
      <div>
        {images && <img className="map-dentist-block-image" src={images} alt="image"/>}
      </div>
      <div>
        {!images && <DentistImageBlockEmpty src={"../../../images/empty_avatar.png"}/>}
      </div>
    </>
  )
}

export default AvatarForMapComponent;
