var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(3001, function () {
//   console.log('Example app listening on port 3001!');
// });


const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/', (req, res) => {
  res.send(
    // { express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }
    'hello'
  );
});