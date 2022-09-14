const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post } = require("../models"); // db 내에서 User 테이블을 가져온 것.
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/", isNotLoggedIn, async (req, res, next) => { // POST /user || next를 넣으면 발생한 에러를 한방에 브라우저로 모아준다.
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
      // 여기서 보내는 res에 대한 send 메시지는 sagas/user.js의 signup 부분 err.response.data 가 된다!
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      //! User 테이블 내에 post, 즉 생성을 요청한다. 또한 async await을 사용함으로써 비동기처리를 해주고 순서대로 처리될 수 있도록 해준다.
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

// POST /user/login
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [{
          model: Post,
        }, {
          model: User,
          as: "Followings",
        }, {
          model: User,
          as: "Followers",
        }
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  req.send("ok");
});

module.exports = router;
