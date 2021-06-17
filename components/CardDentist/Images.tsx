import React, {useState} from "react";
import styled from "styled-components";
// import AdminDrawer from "../AdminPanel/AdminDrawer";

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
    getImagesAvatar()
  }, []);

  const getImagesAvatar = async () => {
    const URL: string = "http://localhost:4000/files/" + data.id
    const requestOptions: {} = {
      method: 'GET',
      redirect: 'follow'
    };

    await fetch(URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        setImages(result[0].src)
      })
      .catch((_error: any) => {
      })
  }

  const Image = () => {
    if (images.length === 0) {
      return <DentistImageBlockEmpty/>
    } else {
      {/*// @ts-ignore*/}
      return <DentistImage src={images} alt="avatar"/>
    }
  }

  return (
    <ImageWrapper>
      <Image />
    </ImageWrapper>
  )
}

export default CardDentistImage
