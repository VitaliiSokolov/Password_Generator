const Login = (server, usersArray) => {
  // LOGIN ROUTE
  server.post('/login', (req, res) => {
    const { username, password } = req.body;
    if ( usersArray.map( (user) => { username == user.username && password == user.password; })) {
      let token = 'Govno';
      res.json({
        sucess: true,
        err: null,
        token,
      });
      console.log('Token sent');
      return;
    }
    else {
      console.log('Unauthorized');
      res.status(404).json({
        sucess: false,
        token: null,
        err: 'Username or password is incorrect'
      });
    }
  });
};

module.exports = Login;