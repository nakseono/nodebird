import React, { useCallback, useState } from "react";

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
        <img src={(images = [0].src)} alt={images[0].src} onClick={onZoom} />
        <img src={(images = [1].src)} alt={images[1].src} onClick={onZoom} />
      </>
    );
  }

  return (
    <>
      <div>
        <img src={(images = [0].src)} alt={images[0].src} onClick={onZoom} />
        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlueOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
    </>
  );
};

export default PostImages;
