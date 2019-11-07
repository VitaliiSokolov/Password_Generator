const Sequelize = require('sequelize');

// const sequelize = new Sequelize('mydb', 'root', 'c0ld.1ce', {
//   dialect: 'mysql',
//   host: 'localhost',
//   port: 3306,
// });

const sequelize = new Sequelize('heroku_e149ee3e4502658', 'b815ad3a871eeb', 'a3f75808', {
  dialect: 'mysql',
  host: 'eu-cdbr-west-02.cleardb.net',
});

const PasswordList = sequelize.define('item', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = PasswordList;
