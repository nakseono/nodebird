module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // users -> model 이름이 자동으로 소문자, 복수가 되어 MySQL 에는 users 라는 테이블이 생성된다.
    {
      // id가 기본적으로 들어간다. (MySQL에서 생성)
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, // 필수적인 값인지 아닌지.
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100), // 비밀번호를 암호화 하는 경우 길이가 엄청 길어지므로 100글자로 넉넉하게 잡아준다.
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장하는 방법
    }
  );

  User.assiociate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  };

  return User;
};
