import React, {useState} from "react";
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

  console.log(watermarkImg)
  return (
    <>
      <div className="mt-30">
        <p className="form-profile-label">
          <label className="form-profile-label">Cover</label>
        </p>
        <p className="profile-photo-box">
          {image && <img className="image" src={image} alt=""/>}
        </p>
        <p className="row-content">
          <label className="button-green-file">Upload</label>
          <input type="file" className="input-file" name="watermark" id="watermark" onChange={addImage}/>
        </p>
      </div>
      <div>
        <p className="form-profile-label">
          <label className="form-profile-label">Watermark</label>
        </p>
        <p className="profile-photo-box">
          {watermarkImg && <ReactImageProcess
              mode="waterMark"
              waterMarkType="image"
              waterMark={watermarkImg}
              coordinate={[10, 10]}
          >
              <img className="image" src={image} alt=""/>
          </ReactImageProcess>
          }
        </p>
        <p className="row-content">
          <label className="button-green-file">Upload</label>
          <input type="file" className="input-file" name="cover_image" id="cover_image" onChange={addWatermark}/>
        </p>
      </div>
    </>
  )
}

export default AddWatermark

