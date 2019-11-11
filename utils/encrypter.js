const crypto = require('crypto');

const encrypt = (text) => {
  var cipher = crypto.createCipher('aes192','d6F3Efeq');
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = (text) => {
  var decipher = crypto.createDecipher('aes192','d6F3Efeq');
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};

module.exports = { encrypt, decrypt };
