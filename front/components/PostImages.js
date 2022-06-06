import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const zoomOnOff = useCallback(() => {
    setShowImagesZoom((prevState) => !prevState);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img src={(images = [0].src)} alt={images} onClick={zoomOnOff} />
        {showImagesZoom && <ImagesZoom images={images} onClose={zoomOnOff} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img
          src={images[0].src}
          style={{ width: "50%", display: "inline-block" }}
          alt={images[0].src}
          onClick={zoomOnOff}
        />
        <img
          src={images[1].src}
          style={{ width: "50%", display: "inline-block" }}
          alt={images[1].src}
          onClick={zoomOnOff}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={zoomOnOff} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img
          src={images[0].src}
          style={{ width: "50%" }}
          alt={images[0].src}
          onClick={zoomOnOff}
        />
        <div
          style={{
            width: "50%",
            display: "inline-block",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={zoomOnOff}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={zoomOnOff} />}
    </>
  );
};

export default PostImages;
