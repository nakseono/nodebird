import React, { useState } from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import styled from "styled-components";

import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  // 여기서 children은 AppLayout으로 감싸질 페이지의 내용이다..!
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>메인페이지</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.github.com/nakseono"
            target="blank"
            rel="noreferrer noopener"
          >
            nakseono github
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
