const local = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'mydb',
};

const heroku = {
  host: 'eu-cdbr-west-02.cleardb.net',
  port: 3306,
  user: 'b815ad3a871eeb',
  password: 'a3f75808',
  database: 'heroku_e149ee3e4502658',
};

module.exports = { heroku, local };
