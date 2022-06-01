import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
// import ImagesZoom from "./ImagesZoom";

const PostImages = ({ images }) => {
  // const [showImagesZoom, setShowImagesZoom] = useState(false);

  // const onZoom = useCallback(() => {
  //   setShowImagesZoom(true);
  // }, []);
  // const onClose = useCallback(() => {
  //   setShowImagesZoom(false);
  // }, []);

  if (images.length === 1) {
    return (
      <>
        <img src={(images = [0].src)} alt={images[0].src} />
        {/* {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />} */}
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
        />
        <img
          src={images[1].src}
          style={{ width: "50%", display: "inline-block" }}
          alt={images[1].src}
        />
        {/* {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />} */}
      </>
    );
  }

  return (
    <>
      <div>
        <img src={images[0].src} style={{ width: "50%" }} alt={images[0].src} />
        <div
          style={{
            width: "50%",
            display: "inline-block",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {/* {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />} */}
    </>
  );
};

export default PostImages;
