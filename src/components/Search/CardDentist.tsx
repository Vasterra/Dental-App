import React, {useState, useEffect} from "react";
import {Grid, Link} from "@material-ui/core";
import styled from "styled-components";
import {
  FlexWrapper,
  ImageDescription,
  CardWrapper,
  CardBlock,
  TitleDescription,
  SubtitleDescription
} from "src/styles/CardDentist.module";
import {
  ButtonBig,
} from "src/styles/Button.module";
import ApiManager from "src/services/ApiManager";

type Props = {
  dentist: any,
  setCurrentDentist: any
}

const CardDentistComponent: React.FunctionComponent<Props> = ({dentist, setCurrentDentist}) => {
  const [images, setImages]: any = useState();

  // @ts-ignore
  useEffect(() => {
    let cleanupFunction = false;
    try {
      ApiManager.downloadAvatar(dentist).then(signedFiles => {
        if (!cleanupFunction) setImages(signedFiles)
      })
    } catch (e) {
      console.error(e.message);
    }
    return () => cleanupFunction = true;
  }, []);

  return (
    <div className="index-gallery-image-box" onClick={() => setCurrentDentist(dentist)}>
      <ImageWrapper>
        {images && <DentistImage src={images} alt="image"/>}
        {!images && <DentistImageBlockEmpty/>}
      </ImageWrapper>
      <p className="index-gallery-image-watermark"></p>
      <img className="index-gallery-image-watermark-img-1" src="../images/check_circle.svg" alt="check"/>
      <Link href={"../../dentist/person/" + dentist.id} target="_blank">
        <div className="index-gallery-image-description">
          <p className="index-gallery-image-title">{dentist.email}</p>
          <p className="index-gallery-image-text">{dentist.firstName}</p>
        </div>
      </Link>
    </div>
  )
}

export default CardDentistComponent;

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

