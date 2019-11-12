const joi = require('joi');

const regValidate = ( login, password, email ) => {
  const data = { login, password, email };
  const schema = joi.object().keys({
    login: joi.string().min(4).max(16).required(),
    email: joi.string().email().lowercase().required(),
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
      } else if(current[1] == 'email') {
        response[2] = true;
      } else if(current[1] == 'password') {
        response[3] = true;
      }
    } else {
      console.log('Error null');
    }
  });
  return response;
};

module.exports = regValidate;
