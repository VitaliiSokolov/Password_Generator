const joi = require('joi');

const loginValidate = ( login, password ) => {
  const data = { login, password };
  const schema = joi.object().keys({
    login: joi.string().min(4).max(16).required(),
    password: joi.string().min(4).max(37).required(),
  });
  let response = [ '', false, false, false];
  joi.validate( data, schema, ( err ) => {
    if(err) {
      let formattedMessage = err.message;
      formattedMessage = formattedMessage.split('[');
      formattedMessage = formattedMessage[1].split(']');
      response[0] = formattedMessage[0];
      let current = err.message.split('\"');
      if(current[1] == 'login') {
        response[1] = true;
      }
      else if(current[1] == 'password') {
        response[2] = true;
      }
      else {
        console.log(response);
      }
    }
  });
  return response;
};

module.exports = loginValidate;
