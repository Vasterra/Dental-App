import React, {useState, useCallback, useRef, useEffect} from 'react';
// @ts-ignore
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  saveCrop: Function
  desabledButtonFiles: Function
  anchor: any
  updateImg: any
  updateImgData: any
  nameUpdateImg: any
}
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const UploadImage: React.FunctionComponent<Props> = ({saveCrop, anchor, desabledButtonFiles, updateImg, updateImgData, nameUpdateImg}) => {
  const [image, setImage]: any = useState(updateImg);
  const [file, setFile]: any = useState([updateImgData]);
  const [cropData, setCropData]: any = useState("#");
  const [cropper, setCropper]: any = useState<any>();
  const [completedCrop, setCompletedCrop]: any = useState(false);

  useEffect(() => {
    !updateImg ? setCompletedCrop(false) : setCompletedCrop(true)
  }, [])

  const onChange = (e: any) => {
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
      setFile(e.target.files as any);
    };
    reader.readAsDataURL(files[0]);
    setCompletedCrop(true)
  };

  const cancel = () => {
    setImage(null)
    setCompletedCrop(false)
    desabledButtonFiles(anchor)
  }

  const getCropData = (file: { name: any; }[]) => {
    if (typeof cropper !== "undefined") {
      // setCropData(cropper.getCroppedCanvas().toDataURL());

      if (!cropper.getCroppedCanvas()) {
        return;
      }
      if (cropper.getCroppedCanvas().toBlob) {
        cropper.getCroppedCanvas().toBlob(function (blob: any) {
          let b: any = blob;
          b.lastModifiedDate = new Date();
          b.name = nameUpdateImg ? nameUpdateImg : file[0].name;
          saveCrop(blob, anchor)
        }, 'image/jpeg', 1)
      }
      saveCrop(cropper.getCroppedCanvas(), anchor)
    }
  };

  return (
    <div className="gallery-block-image">
      {!completedCrop && <p className="gallery-upload">
        <label className="button-green-file">Upload</label>
        <input type="file" className="input-file2" name="cover_image" id="cover_image" accept="image/*"
               onChange={onChange}/>
        <span className="upload-subtitle">Max Size 2MB</span>
      </p>}
      <Cropper
        style={{height: 316, width: "100%"}}
        initialAspectRatio={1}
        preview=".img-preview"
        src={image}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
        guides={true}
      />
      {completedCrop &&
      <div className="uploadimage-settings">
        <img className="delete-button" src="../../images/delete_forever.svg" alt="delete" onClick={cancel}/>
        <button className="button-green" onClick={() =>
          getCropData(file)
        }>Crop
        </button>
      </div>}
    </div>
  );
}

export default UploadImage;
