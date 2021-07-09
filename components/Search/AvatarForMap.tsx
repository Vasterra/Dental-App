import React, {useState} from "react";
import {Storage} from "aws-amplify";
import styled from "styled-components";


const DentistImageBlockEmpty = styled("div")`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  opacity: 1;
`;

type Props = {
  data: any,
}

const CardDentistImage: React.FunctionComponent<Props> = ({data}) => {
  const [images, setImages]: any = useState([]);

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
    <>
      <div>
        {images && <img className="map-dentist-block-image" src={images.src} alt="image"/>}
      </div>
      <div>
        {!images && <DentistImageBlockEmpty />}
      </div>
    </>

  )
}

export default CardDentistImage;
