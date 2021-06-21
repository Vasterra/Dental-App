import React from "react";
//@ts-ignore
import Gallery from 'react-grid-gallery';
import styled from "styled-components";

const GalleryWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background: #FFFFFF 0 0 no-repeat padding-box;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
`;

type Props = {
  downloadImages: Function
  images: any
}

const GalleryComponent: React.FunctionComponent<Props> = ({images, downloadImages}) => {

  return (
    <GalleryWrapper>
      {/*<img src={filesList[1].key} alt="" />*/}
      <Gallery
        images={images}
        enableLightbox={true}
        enableImageSelection
        // onSelectImage={selectImage}
      />
    </GalleryWrapper>
  )
}

export default GalleryComponent;