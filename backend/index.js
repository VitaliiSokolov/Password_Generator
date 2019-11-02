// Bringing all the dependencies in
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

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
    password: '3513'
  },
  {
    id: 2,
    username: 'guest',
    password: '3513'
  }
];
// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  for (let user of users) {
    if (username == user.username && password == user.password) {
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
  }
});

app.get('/gen', (req, res) => {
  if(req.headers.key === 'Govno'){
    res.send({ message: '=)' }); //Sending some response when authenticated
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