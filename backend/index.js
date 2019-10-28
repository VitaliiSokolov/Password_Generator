var express = require('express');
var app = express();
var router = express.Router();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/xxx', (req, res) => {
  res.send(
    { user : 'User ^_^' }
  );
});

module.exports = app;
