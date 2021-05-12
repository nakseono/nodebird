import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img src={(images = [0].src)} alt={images[0].src} onClick={onZoom} />
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
          onClick={onZoom}
        />
        <img
          src={images[1].src}
          style={{ width: "50%", display: "inline-block" }}
          alt={images[1].src}
          onClick={onZoom}
        />
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
          onClick={onZoom}
        />
        <div
          style={{
            width: "50%",
            display: "inline-block",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
    </>
  );
};

export default PostImages;
