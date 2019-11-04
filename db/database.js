const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydb', 'root', 'c0ld.1ce', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
});
module.exports = sequelize;

// sequelize.sync().then(result=>{
//   console.log(result);
// })
//   .catch(err=> console.log(err));

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


// create user
// UserModel.create({
//   username: 'Tx',
//   email: 'Tx@gmail.com',
//   password: 'Tx123',
// }).then(res=>{
//   const user = {id: res.id, username: res.username, email: res.email, password: res.password}
//   console.log(user);
// }).catch(err=>console.log(err));

// all data
// UserModel.findAll({raw:true}).then(users=>{
//   console.log(users);
// }).catch(err=>console.log(err));

// filter data
// UserModel.findAll({where:{username: 'T'}, raw: true })
//   .then(users=>{
//     console.log(users);
//   }).catch(err=>console.log(err));

// find data one
// UserModel.findOne({where: {username: 'Tom'}})
//   .then(user=>{
//     if(!user) return;
//     console.log(user.username, user.password, user.email);
//   }).catch(err=>console.log(err));

// find data first-key
// UserModel.findByPk(1)
//   .then(user=>{
//     if(!user) return;
//     console.log(user.username, user.password, user.email);
//   }).catch(err=>console.log(err));
