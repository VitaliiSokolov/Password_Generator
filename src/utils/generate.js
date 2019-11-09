const joi = require('joi');

const generating = ( min, max, special ) => {
  const data = { min, max, special };
  let password = [];
  let result = [ '', '' ];
  const schema = joi.object().keys({
    min: joi.number().positive().min(3).max(37).required(),
    max: joi.number().positive().min(3).max(37).greater(joi.ref('min')).required() ,
    special: joi.boolean(),
  });

  joi.validate( data, schema, ( err ) => {
    if(err) {
      let formattedMessage = err.message;
      formattedMessage = formattedMessage.split('[');
      formattedMessage = formattedMessage[1].split(']');
      return result[0] = formattedMessage;
    } else {
      let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let extentendedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
      const length = Math.random() * (max - min) + min;
      if(special){
        for (let i = 0; i < length; i++) {
          const genChar = Math.floor(Math.random() * 91);
          password.push(extentendedCharacters[genChar]);
        }
      } else {
        for (let i = 0; i < length; i++) {
          const genChar = Math.floor(Math.random() * 68);
          password.push(characters[genChar]);
        }
      }
      return result[1] = password.join('');
    }
  });
  return result;
};

module.exports = generating;
