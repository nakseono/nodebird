const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post } = require("../models"); // db 내에서 User, Post 테이블을 가져온 것.
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // Get /user
  try {
    if (req.user) {
      // req.user 는 passport로 인해 로그인을 한 상태이면 상시 유지되므로 불러와진다면 로그인이 된 상태인 것이다.
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"], // 서버로부터 프론트엔드에 필요한 데이터만 보내주는 것.
            // 게시글 수, 팔로잉, 팔로워 숫자만 파악하려면 굳이 하나하나 데이터를 다 가져올 필요 없이 id만 가져온다.
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
  // POST /user || next를 넣으면 발생한 에러를 한방에 브라우저로 모아준다.
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
      console.log("test");
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
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );

    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
  //! PATCH /1/follow
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });

    if (!user) {
      res.status(403).send("팔로우하려는 유저가 존재하지 않습니다.");
    }

    await user.addFollowers(req.user.id);

    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
  //! DELETE /1/follow
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });

    if (!user) {
      res.status(403).send("언팔로우하려는 유저가 존재하지 않습니다.");
    }

    await user.removeFollowers(req.user.id);

    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/followers", isLoggedIn, async (req, res, next) => {
  //! GET /user/followers
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      res.status(403).send("없는 사람을 찾으려고 하시네요?");
    }

    const followers = await user.getFollowers();

    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/followings", isLoggedIn, async (req, res, next) => {
  //! GET /user/followings
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      res.status(403).send("없는 사람을 찾으려고 하시네요?");
    }

    const followings = await user.getFollowings();

    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/follower/:userId", isLoggedIn, async (req, res, next) => {
  //! DELETE user/follower/2
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });

    if (!user) {
      res.status(403).send(`없는 사람을 차단하려고 합니다.`);
    }

    await user.removeFollowings(req.user.id);

    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
