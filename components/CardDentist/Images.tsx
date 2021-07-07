import React, {useState} from "react";
import styled from "styled-components";
import {Storage} from "aws-amplify";

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
  const [images, setImages] = useState([]);

  React.useEffect(() => {
    downloadImages()
  }, []);

  const downloadImages = async () => {
    try {
      if (data === null) return
      const files = await Storage.list('images/' + data.id + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      let filesList = signedFiles.map((f: any) => {
        return {
          thumbnail: f,
          src: f,
          name: f,
          thumbnailWidth: 320,
          thumbnailHeight: 212,
          isSelected: false
        }
      })
      console.log(filesList)
      setImages(filesList[0])
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  return (
    <ImageWrapper>
      {images && <DentistImage
        // @ts-ignore
          src={images.src} alt="image"/>}
      {!images && <DentistImageBlockEmpty/>}
    </ImageWrapper>
  )
}

export default CardDentistImage;
