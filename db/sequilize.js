const Sequelize = require('sequelize');
const UserModel = require('./db-users');
const PasswordList = require('./db-passwords');

// const sequelize = new Sequelize('mydb', 'root', 'c0ld.1ce', {
//   dialect: 'mysql',
//   host: 'localhost',
//   port: 3306,
// });

// module.exports = sequelize;

const sequelize = new Sequelize('heroku_e149ee3e4502658', 'b815ad3a871eeb', 'a3f75808', {
  dialect: 'mysql',
  host: 'eu-cdbr-west-02.cleardb.net',
});

module.exports = sequelize;


PasswordList.belongsTo(UserModel);
UserModel.hasMany(PasswordList);

sequelize.sync().then(result=>{
  console.log(result);
  console.log('sync');
})
  .catch(err=> console.log(err));
