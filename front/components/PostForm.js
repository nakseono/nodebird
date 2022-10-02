import React, { useCallback, useRef, useEffect } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";
import useInput from "../hooks/useInput";
import { UPLOAD_IMAGES_REQUEST } from "../reducers/post";
import image from "../../back/models/image";

const PostWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput("");

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);

    const imageFormData = new FormData();

    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  return (
    <PostWrapper encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 일이 일어나고 있나요?"
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={v} style={{ width: "200px" }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          );
        })}
      </div>
    </PostWrapper>
  );
};

export default PostForm;
