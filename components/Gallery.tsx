import React, {Component} from "react";
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

class GalleryComponent extends Component {

  render() {
    return (
      <GalleryWrapper style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        overflow: "auto"
      }}>

      </GalleryWrapper>
    )
  }

}

export default GalleryComponent;