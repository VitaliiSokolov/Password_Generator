const {  UserModel } = require('../models/index');
const { checkEmailLogin } = require('../services/checkEmailLogin');
const { createUser } = require('../services/createUser');
// const errorHandler = require('../services/errorHandler');

// REGISTRATION ROUTE
const Register = (server) => {
  server.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const user = await checkEmailLogin(username, email, UserModel);
    console.log(user, 'SSSS');

    if(user === null) {
      if(username && password){
        await createUser(req.body, UserModel)
          .then(res=>{
            const user = {id: res.id, username: res.username, email: res.email, password: res.password};
            console.log(user);
          })
          .catch(err=>console.log(err));
        res.send({
          username,
          email,
          password,
        });
      } else {
        res.status(400).send({
          error: 'Registration Declined: Username and password are empty'
        });
      }
    } else {
      res.status(400).send({
        error: 'Registration Declined: User already exist'
      });
    }
  });
};

module.exports = Register;
