import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ApiManager from 'src/services/ApiManager';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const DentistImageBlockEmpty = styled('img')`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  opacity: 1;
`;

const CheckIcon = styled('div')`
  position: absolute;
  left: 75px;
  top: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

type Props = {
  dentist: any,
}

const AvatarForMapComponent: React.FunctionComponent<Props> = ({ dentist }) => {
  const [images, setImages]: any = useState();

  // @ts-ignore
  useEffect(() => {
    let cleanupFunction = false;
    try {
      ApiManager.downloadAvatar(dentist).then(signedFiles => {
        if (!cleanupFunction) setImages(signedFiles);
      });
    } catch (error: any) {
      console.error(error.message);
    }
    return () => cleanupFunction = true;
  }, []);

  return (
    <>

      <div>
        {dentist.hasPaidPlan ?
          <CheckIcon><CheckCircleIcon style={{fill: "white"}}/></CheckIcon> : <></>}
        {images && <img className='map-dentist-block-image' src={images} alt='image' />}
      </div>
      <div>
        {dentist.hasPaidPlan ?
          <img className='index-gallery-image-watermark-img-1' src='../images/check_circle.svg' alt='check' /> : <></>}
        {!images && <DentistImageBlockEmpty src={'../../../images/empty_avatar.png'} />}
      </div>
    </>
  );
};

export default AvatarForMapComponent;
