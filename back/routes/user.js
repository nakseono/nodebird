const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models"); // db 내에서 User 테이블을 가져온 것.

const router = express.Router();

router.post("/", async (req, res, next) => { // POST /user || next를 넣으면 발생한 에러를 한방에 브라우저로 모아준다.
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({ //! User 테이블 내에 post, 즉 생성을 요청한다. 또한 async await을 사용함으로써 비동기처리를 해주고 순서대로 처리될 수 있도록 해준다.
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500 -> 서버쪽 에러라는 뜻
  }
});

module.exports = router;
