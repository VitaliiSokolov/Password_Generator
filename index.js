// Bringing all the dependencies in
const express = require('express');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const exjwt = require('express-jwt');

// Instantiating the express app
const app = express();


// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
// const jwtMW = exjwt({
//   secret: 'keyboard cat 4 ever'
// });

// MOCKING DB just for test
let users = [
  {
    id: 1,
    username: 'vetal',
    password: '3513',
    email: 'admin@gmail.com'
  },
  {
    id: 2,
    username: 'guest',
    password: '3513',
    email: 'guest@gmail.com'
  },
];
// app.get('/*', (req, res) => {
//   console.log(req.headers);

// });
// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users.map( (user) => { username == user.username && password == user.password; })) {
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
// REGISTRATION ROUTE
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  if(username && password){
    console.log('Registration successed', username, email, password );
    users = [
      ...users,
      {id:users.length+1,
        username,
        email,
        password}
    ];
    console.log(users);
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
// GENERATOR'S VIEW ROUTE
app.get('/gen', (req, res) => {
  if(req.headers.key === 'Govno'){
    res.send({ message: 'Tester' }); //Sending some response when authenticated
  }
  else {
    res.send({ message: 'Unauthorized' }); //Sending some response when NOT authenticated
  }
});
// Error handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});
// Starting the app on PORT 3000
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});
const path = require('path');
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/build')));
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});