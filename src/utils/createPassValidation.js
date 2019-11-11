const joi = require('joi');

const createPassValidate = ( title, value ) => {
  const data = { title, value };
  const schema = joi.object().keys({
    title: joi.string().min(1).required(),
    value: joi.string().min(3).required(),
  });
  let response = [ '', false ];
  joi.validate( data, schema, ( err ) => {
    if(err) {
      let formattedMessage = err.message;
      formattedMessage = formattedMessage.split('[');
      formattedMessage = formattedMessage[1].split(']');
      response[0] = formattedMessage[0];
      console.log(response[0]);
      let current = err.message.split('\"');
      if(current[1] == 'title') {
        response[1] = true;
      }
      else if(current[1] == 'value') {
        response[2] = true;
      }
      else {
        console.log(response);
      }
    }
  });
  return response;
};

module.exports = createPassValidate;
