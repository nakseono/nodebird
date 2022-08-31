module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag", // Hashtags -> model 이름이 자동으로 소문자, 복수가 되어 MySQL 에는 Hashtags 라는 테이블이 생성된다.
    {
      // id가 기본적으로 들어간다. (MySQL에서 생성)
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글+이모티콘 저장하는 방법
    }
  );

  Hashtag.assiociate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  };
  return Hashtag;
};
