import React, { useState } from "react";
import ReactImageProcess from 'react-image-process';

const AddWatermark = () => {

  const [image, setImage]: any = useState();
  const [watermarkImg, setWatermarkImg]: any = useState();

  const addImage = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const addWatermark = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setWatermarkImg(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const uploadWatermark = () => {

  }
  console.log(watermarkImg)
  return (
    <>
      <div>
        <p className="form-profile-label">
          <label className="form-profile-label ">Cover</label>
        </p>
        <p className="profile-photo-box">
          <ReactImageProcess
            mode="waterMark"
            waterMarkType="image"
            waterMark={watermarkImg}
            width={60}
            height={60}
            opacity={0.7}
            coordinate={[430, 200]}
          >
            { image && <img className="image" src={image} alt=""/> }
          </ReactImageProcess>
        </p>
        <p className="row-content">
          <label className="button-green-file">Upload</label>
          <input type="file" className="input-file" name="cover_image" id="cover_image" onChange={addImage} />
        </p>
      </div>
      <div className="mt-30">
        <p className="form-profile-label">
          <label className="form-profile-label ">Watermark</label>
        </p>
        <p className="profile-photo-box">
          { watermarkImg && <img className="image" src={watermarkImg} alt=""/> }
        </p>
        <p className="row-content">
          <label className="button-green-file">Upload</label>
          <input type="file" className="input-file" name="watermark" id="watermark" onChange={addWatermark} />
        </p>
        <button onClick={uploadWatermark}>dawferfre</button>
      </div>
    </>
  )
}

export default AddWatermark
