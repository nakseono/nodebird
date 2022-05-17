import React from "react";
import { Form, Input } from "antd";
import styled from "styled-components";

const NicknameSearchForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  return (
    <NicknameSearchForm>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </NicknameSearchForm>
  );
};

export default NicknameEditForm;