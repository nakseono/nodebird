module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment", // Comments -> model 이름이 자동으로 소문자, 복수가 되어 MySQL 에는 Comments 라는 테이블이 생성된다.
    {
      // id가 기본적으로 들어간다. (MySQL에서 생성)
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // UserId: 1,
      // PostId: 3,
      // -> 위 내용은 associate 즉, 관계를 설정하면 보이지않지만 생성되는것이라고 생각하면 된다.
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글 저장하는 방법
    }
  );

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
