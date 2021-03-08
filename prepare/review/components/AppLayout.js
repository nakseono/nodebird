import React from "react";
import Link from "next/link";
import { Menu } from "antd";

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
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

export default AppLayout;
