const {INTEGER, STRING} = require('sequelize').Sequelize;
const { local, stage } = require('../db/sequilize');

const passwordModel = local.define('item', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: STRING,
    allowNull: false
  },
  value: {
    type: STRING,
    allowNull: false
  }
});

module.exports = passwordModel;
