const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const setUpRoutes = require('./controllers/controller');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  res.setHeader('Cache-Control', 'private');
  next();
});
// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Takes all routes
setUpRoutes(app);
// Strange SSR
const path = require('path');
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/build')));
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});

