const {  UserModel } = require('../models/index');
const { checkEmail } = require('../services/databaseServices/checkEmail');
const { createUser } = require('../services/databaseServices/createUser');

// REGISTRATION ROUTE
const Register = (server) => {
  server.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const user = await checkEmail(req.body, UserModel);
    if(!user) {
      if(username && password){
        await createUser(req.body, UserModel)
          .then(res=>{
            const user = {id: res.id, username: res.username, email: res.email, password: res.password};
            console.log(user);
          })
          .catch(err=>console.log(err));
        res.json({
          username,
          email,
          password,
        });
      } else {
        res.status(400).json({
          error: 'Registration Declined: Username and password are empty'
        });
      }
    } else {
      res.status(400).json({
        error: 'Registration Declined: User already exist'
      });
    }
  });
};

module.exports = Register;
