const {INTEGER, STRING} = require('sequelize').Sequelize;
const {
  // local,
  stage
} = require('../db/sequilize');

const UserModel = stage.define('user', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  }
});
module.exports = UserModel;
