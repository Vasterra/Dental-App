import React, {useState, useCallback, useRef, useEffect} from 'react';
// @ts-ignore
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function generateDownload(canvas: any, crop: any, saveCrop: any, file: any, anchor: any) {
  if (!crop || !canvas) {
    return;
  }
  if (canvas.toBlob) {
    canvas.toBlob(function (blob: any) {
      let b: any = blob;
      b.lastModifiedDate = new Date();
      b.name = file[0].name;
      saveCrop(blob, anchor)
    }, 'image/jpeg', 1)
  }
}

type Props = {
  saveCrop: Function
  desabledButtonFiles: Function
  anchor: any
}

const UploadImage: React.FunctionComponent<Props> = ({saveCrop, anchor, desabledButtonFiles}) => {
  const [upImg, setUpImg] = useState(null);
  const [file, setFile] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: '%', width: 100,
    height: 100, aspect: 16 / 9
  });
  const [completedCrop, setCompletedCrop]: any = useState(null);

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files)
      const reader: any = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      // filesDownload()
    }
  };

  const cancel = () => {
    setUpImg(null)
    setCompletedCrop(null)
    desabledButtonFiles(anchor)
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image: any = imgRef.current;
    const canvas: any = previewCanvasRef.current;
    const crop: any = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <div className="gallery-block-image">
      {!completedCrop?.width && <p className="gallery-upload">
          <label className="button-green-file">Upload</label>
          <input type="file" className="input-file2" name="cover_image" id="cover_image" accept="image/*"
                 onChange={onSelectFile}/>
          <span className="upload-subtitle">Max Size 2MB</span>
      </p>}
      {upImg && <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c: any) => setCrop(c)}
        onComplete={(c: any) => setCompletedCrop(c)}
      /> }
      <canvas
        ref={previewCanvasRef}
        style={{
          width: Math.round(completedCrop?.width ?? 0),
          height: Math.round(completedCrop?.height ?? 0),
          position: 'absolute',
          left: 0,
          zIndex: -1,
        }}
      />
      {completedCrop?.width &&
      < div className="uploadimage-settings">
          <img className="delete-button" src="../../images/delete_forever.svg" alt="delete" onClick={cancel}/>
          <button className="button-green" onClick={() =>
            generateDownload(previewCanvasRef.current, completedCrop, saveCrop, file, anchor)
          }>Crop
          </button>
      </div>}
    </div>
  );
}

export default UploadImage;
