const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    //! sequelize.difine 이후에 나오는 첫 인수에 넣은 'Comment' 는 mysql에 자동으로 'Comments' 테이블로 생성 및 저장된다.
    "Comment",
    {
      //! 두번째 인수는 방금 생성된 테이블의 셀을 만들어주는 것이고 (어떤게 들어있을지)
      // 나중에 활용하게 되는 id는 mysql에서 자동으로 만들어준다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      //! 세번째 인수는 두번째 인수에서 만든 테이블의 설정을 한다.
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  Comment.associate = (db) => {};
  return Comment;
};
