import React from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";

const AppLayout = ({ children }) => {
  // 여기서 children은 AppLayout으로 감싸질 페이지의 내용이다..!
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
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          왼쪽 메뉴
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
