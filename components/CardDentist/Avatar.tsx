import React, {useState} from "react";
import styled from "styled-components";

const DentistAvatar = styled("img")`
  display: block;
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const DentistAvatarBlockEmpty = styled("div")`
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
  const [images, setImages] = useState([]);

  React.useEffect(() => {
    getImagesAvatar()
  }, []);

  const getImagesAvatar = async () => {
    const URL: string = "http://localhost:4000/files/" + data.id + "/avatar/"
    const requestOptions: {} = {
      method: 'GET',
      redirect: 'follow'
    };

    await fetch(URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        setImages(result[0].src)
      })
      .catch(() => {
        DentistPhotoWithoutMe()
      })
  }

  const DentistPhotoWithoutMe = () => {
    if (images.length === 0) {
      return <DentistAvatarBlockEmpty/>
    }
      {/*// @ts-ignore*/}
      return <DentistAvatar src={images} alt="avatar"/>
  }

  return (
    <DentistPhotoWithoutMe />
  )
}

export default AvatarDentistComponent
