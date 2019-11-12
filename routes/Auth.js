const { login, checkEmailLogin } = require('../services/authService');
const { createUser } = require('../services/userService');
const generateToken = require('../utils/token');
const regValidation = require('../utils/regValidation');
const loginValidation = require('../utils/loginValidation');

const Auth = (server) => {
  // REGISTRATION ROUTE
  server.post('/auth/register',
    async (req, res, next) => {
      const { username, password, email } = req.body;
      const validation = await regValidation(username, password, email);
      if(validation[0].length < 1){
        next();
      } else {
        res.status(400).send(validation[0]);
      }
    },
    async (req, res, next) => {
      try{
        const { username, password, email } = req.body;
        const user = await checkEmailLogin(username, email);
        if(user !== null) {
          res.status(400).send({
            error: 'Registration Declined: User already exists'
          });
        } else {
          await createUser(req.body)
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
        }
      } catch(e) {
        next(e);
      }
    }
  );
  // LOGIN ROUTE
  server.post('/auth/login',
    async (req, res, next) => {
      const { username, password } = req.body;
      const validation = await loginValidation(username, password );
      if(validation[0].length < 1){
        next();
      } else {
        res.status(400).send(validation[0]);
      }
    },
    async (req, res, next) => {
      try {
        const user = await login(req.body);
        if ( user !== null ) {
          let token = generateToken(user);
          res.send({
            user: user,
            token
          });
          console.log('Token sent');
          return;
        } else {
          res.status(400).send('Invalid username / password');
        }
      } catch(e) {
        next(e);
      }
    }
  );
};

module.exports = Auth;
