const express = require("express");
const postRouter = require("./routes/post");
const db = require("./models/index");

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/post", postRouter); // route 분기해주면서 prefix 붙은 것.

app.listen(3065, () => {
  console.log("서버 실행 중");
});
