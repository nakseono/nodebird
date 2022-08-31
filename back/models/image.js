module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image", // Images -> model 이름이 자동으로 소문자, 복수가 되어 MySQL 에는 Images 라는 테이블이 생성된다.
    {
      // id가 기본적으로 들어간다. (MySQL에서 생성)
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글+이모티콘 저장하는 방법
    }
  );

  Image.assiociate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
