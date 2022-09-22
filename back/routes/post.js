const express = require("express");
const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

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
              model: User,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        },
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
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

router.delete("/", (req, res) => {
  // DELETE /post
  res.json([{ id: 1 }]);
});

module.exports = router;
