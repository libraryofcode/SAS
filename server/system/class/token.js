class Token {
  constructor(str) {
    const userID = Buffer.from(str).toString('base64');
    const date = Buffer.from(new Date().toLocaleString('en-us')).toString('base64');
    const Crypto = require('crypto');
    const tokenize = Crypto.randomBytes(48).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    const token = `${userID}.${date}.${tokenize}`;
    return token;
  }
}
module.exports = Token;
