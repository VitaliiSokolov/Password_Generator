var express = require('express');
var app = express();
var router = express.Router();

const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/xxx', (req, res) => {
  res.send(
    { express : 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }
  );
});

module.exports = app;
