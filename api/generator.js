const Gener = (server) => {
  // GENERATOR'S VIEW ROUTE
  server.get('/gen', (req, res) => {
    if(req.headers.key === 'Govno'){
      res.setHeader('Cache-Control', 'private');
      res.send({ message: 'Tester' }); //Sending some response when authenticated
    }
    else {
      res.send({ message: 'Unauthorized' }); //Sending some response when NOT authenticated
    }
  });
};

module.exports = Gener;
