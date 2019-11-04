const Register = (server, usersArray) => {
  // REGISTRATION ROUTE
  server.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    if(username && password){
      console.log('Registration successed', username, email, password );
      usersArray = [
        ...usersArray,
        {id:usersArray.length+1,
          username,
          email,
          password}
      ];
      console.log(usersArray);
      res.json({
        signUP: true,
        username,
        email,
        password,
        err: null,
      });
    } else {
      console.log('Registration Declined');
      res.status(404).json({
        signUP: false,
        username: null,
        email: null,
        password: null,
        err: 'Username or password are empty'
      });
    }
  });
};

module.exports = Register;
