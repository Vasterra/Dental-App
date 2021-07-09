import React, {useState, useCallback, useRef} from "react";
import styled from "styled-components";
// @ts-ignore
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Uploady, {
  withRequestPreSendUpdate,
  useItemFinalizeListener
} from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
// @ts-ignore
import UploadPreview, {PREVIEW_TYPES} from "@rpldy/upload-preview";
import cropImage from "utils/cropImage";

const StyledReactCrop = styled(ReactCrop)`
  width: 100%;
  /* max-width: 900px; */
  height: 314px;
`;

const PreviewImage = styled.img`
  margin: 5px;
  max-width: 500px;
  height: auto;
  max-height: 500px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const PreviewButtons = (props: { finished: any; crop: any; updateRequest: any; onUploadCancel: any; onUploadCrop: any; }) => {
  const {finished, crop, updateRequest, onUploadCancel, onUploadCrop} = props;
  console.log(finished)
  return (
    <ButtonsWrapper>
      <button
        style={{
          display: !finished && updateRequest && crop ? "block" : "none"
        }}
        onClick={onUploadCrop}
      >
        Upload Cropped
      </button>
      <button
        style={{display: !finished && updateRequest ? "block" : "none"}}
        onClick={updateRequest}
      >
        Upload without Crop
      </button>
      <button
        style={{
          display: !finished && updateRequest && crop ? "block" : "none"
        }}
        onClick={onUploadCancel}
      >
        Cancel
      </button>
    </ButtonsWrapper>
  );
};

const ItemPreviewWithCrop = withRequestPreSendUpdate((props) => {
  const {
    id,
    url,
    isFallback,
    type,
    updateRequest,
    requestData,
    previewMethods
  }: any = props;
  const [finished, setFinished] = useState(false);
  const [crop, setCrop] = useState({aspect: 4 / 3});

  useItemFinalizeListener(() => {
    setFinished(true);
  }, id);

  const onUploadCrop = useCallback(async () => {
    // @ts-ignore
    if (updateRequest && (crop?.height || crop?.width)) {
      requestData.items[0].file = await cropImage(
        url,
        requestData.items[0].file,
        crop
      );
      updateRequest({items: requestData.items});
    }
  }, [url, requestData, updateRequest, crop]);

  const onUploadCancel = useCallback(() => {
    updateRequest(false);
    if (previewMethods.current?.clear) {
      previewMethods.current.clear();
    }
  }, [updateRequest, previewMethods]);

  return isFallback || type !== PREVIEW_TYPES.IMAGE ? (
    <PreviewImage src={url} alt="fallback img"/>
  ) : (
    <>
      {requestData && !finished ? (
        <StyledReactCrop
          src={url}
          crop={crop}
          onChange={setCrop}
          onComplete={setCrop}
        />
      ) : (
        <PreviewImage src={url} alt="uploading img"/>
      )}
      <PreviewButtons
        finished={finished}
        crop={crop}
        updateRequest={updateRequest}
        onUploadCancel={onUploadCancel}
        onUploadCrop={onUploadCrop}
      />
      <p>{finished ? "FINISHED" : ""}</p>
    </>
  );
});

export default function UploadImage() {
  const previewMethodsRef = useRef();
  return (
    <>
      <div className="gallery-block-image">
        <p className="gallery-upload">
          <Uploady destination={{url: "[upload-url]"}}>
            <UploadButton className="button-green-file">Upload</UploadButton>
            <input type="file" className="input-file" name="cover_image" id="cover_image"/>
            <span className="upload-subtitle">Max Size 2MB</span>
            <UploadPreview
              // @ts-ignore
              PreviewComponent={ItemPreviewWithCrop}
              previewComponentProps={{previewMethods: previewMethodsRef}}
              // @ts-ignore
              previewMethodsRef={previewMethodsRef}
              // fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
            />
          </Uploady>

        </p>
      </div>
    </>

  );
}
