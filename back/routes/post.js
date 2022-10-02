const express = require("express");
const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const fs = require("fs");

const router = express.Router();
const multer = require("multer");
const path = require("path");

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없어 생성합니다");
  fs.mkdirSync("uploads");
}

router.post("/", isLoggedIn, async (req, res, next) => {
  // POST /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  // :postId 는 동적으로 바뀌는 params.
  // POST /post
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }, // params(= parameter) 는 주소부문에서 동적으로 바뀌는 부문이다.
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글 입니다.");
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  //! PATCH /post/1/like
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }

    await post.addLikers(req.user.id); // 관계형 데이터베이스 이기에 addLikers가 생긴다.
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  //! DELETE /post/1/like

  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }

    await post.removeLikers(req.user.id); // 관계형 데이터베이스 이기에 addLikers가 생긴다.
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // 선호.png
      const ext = path.extname(file.originalname); // .png
      const basename = path.basename(file.originalname, ext); // 선호
      done(null, basename + new Date().getTime() + ext); // 선호.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

module.exports = router;
