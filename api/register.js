const UserModel = require('../models/users');
const Register = (server) => {
  // REGISTRATION ROUTE
  server.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    let user = await UserModel.findOne({where: {email}});
    if(!user) {
      if(username && password){
        await UserModel.create({ username: username, email: email, password: password, })
          .then(res=>{
            const user = {id: res.id, username: res.username, email: res.email, password: res.password};
            console.log(user);
          })
          .catch(err=>console.log(err));
        res.json({
          signUP: true,
          username,
          email,
          password,
          err: null,
        });
      } else {
        console.log('Registration Declined: Username and password are empty');
        res.status(400).json({
          signUP: false,
          username: null,
          email: null,
          password: null,
          error: 'Username and password are empty'
        });
      }
    } else {
      console.log('Registration Declined: User already exist');
      res.status(400).json({
        signUP: false,
        username: null,
        email: null,
        password: null,
        error: 'User already exist'
      });
    }
  });
};

module.exports = Register;
