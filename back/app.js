const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const db = require("./models");
const cors = require("cors");
const path = require("path");

const passport = require("passport");
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

passportConfig();

app.use(morgan("dev"));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//! 위 두개의 use가 프론트에서 보낸 데이터를 req.body에 넣어주는 역할이다.
// json 타입으로 넘어오느냐, urlencoded -> form submit을 했을 때 urlencoded로 넘어온다.

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/post", postRouter); // route 분기해주면서 prefix 붙은 것.
app.use("/user", userRouter); // route 분기해주면서 prefix 붙은 것.
app.use("/posts", postsRouter);

app.listen(3065, () => {
  console.log("서버 실행 중");
});
