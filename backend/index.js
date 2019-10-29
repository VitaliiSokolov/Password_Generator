var express = require('express');
const bodyParser = require("body-parser");

var app = express();
var router = express.Router();

const port = process.env.PORT || 5000;
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/generator', urlencodedParser, (req, res) => {
  res.send(
    { user : 'User (^_^)' }
  );
});

app.post("/register", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);
  console.log(request.body);
  response.send(`<h1>${request.body.userName}</h1> <h1>${request.body.userEmail}</h1>  <h1>${request.body.userMainPassword}</h1>`);
});

module.exports = app;
