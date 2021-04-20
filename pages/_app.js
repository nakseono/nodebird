import React from "react";
import "antd/dist/antd.css";
import Head from "next/head";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

export default NodeBird;
