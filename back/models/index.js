const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; // 배포할 때에는 production으로 바뀌고, 개발할때에만 development
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); // mysql의 db에 연결해주는 과정. 이후에는 테이블(model)을 만들어야 하므로, 아래의 코드가 나온다.

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
