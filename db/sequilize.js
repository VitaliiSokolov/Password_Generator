const Sequelize = require('sequelize');

const local = new Sequelize('mydb', 'root', 'c0ld.1ce', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
});

const stage = new Sequelize('heroku_e149ee3e4502658', 'b815ad3a871eeb', 'a3f75808', {
  dialect: 'mysql',
  host: 'eu-cdbr-west-02.cleardb.net',
});

module.exports = { local, stage };
