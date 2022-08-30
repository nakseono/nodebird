module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post", // posts -> model 이름이 자동으로 소문자, 복수가 되어 MySQL 에는 posts 라는 테이블이 생성된다.
    {
      // id가 기본적으로 들어간다. (MySQL에서 생성)
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글+이모티콘 저장하는 방법
    }
  );

  Post.assiociate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // 해당 게시글에 좋아요를 누른 사람들.
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
