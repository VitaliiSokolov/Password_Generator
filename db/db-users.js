const Sequelize = require('sequelize');
const PasswordList = require('./db-passwords');

// const sequelize = new Sequelize('mydb', 'root', 'c0ld.1ce', {
//   dialect: 'mysql',
//   host: 'localhost',
//   port: 3306,
// });

const sequelize = new Sequelize('heroku_e149ee3e4502658', 'b815ad3a871eeb', 'a3f75808', {
  dialect: 'mysql',
  host: 'eu-cdbr-west-02.cleardb.net',
});

const UserModel = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = UserModel;


UserModel.hasMany(PasswordList);
PasswordList.belongsTo(UserModel);

// sequelize.sync().then(result=>{
//   console.log(result);
//   console.log('sync');
// })
//   .catch(err=> console.log(err));
