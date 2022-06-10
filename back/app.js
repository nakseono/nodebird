const express = require("express");
const postRouter = require("./routes/post");

const app = express();

app.get("/", (req, res) => {});

app.use("/post", postRouter); // /post 가 접두사(prefix) 로 붙는다.

express.listen(3065, () => {
  console.log("서버 실행 중");
});
