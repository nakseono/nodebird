import React from "react";

const AppLayout = ({ children }) => {
  // 여기서 children은 AppLayout으로 감싸질 페이지의 내용이다..!
  return (
    <div>
      <div>공통메뉴</div>
      {children}
    </div>
  );
};

export default AppLayout;
