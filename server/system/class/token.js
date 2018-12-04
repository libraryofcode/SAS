class Token { 
  constructor(token) {
    this.token = token;
  }
  get genToken() {
    return this.tokenize();
  }
  tokenize() {
    const userID = Buffer.from(this.token).toString('base64');
    const date = Buffer.from(new Date().getUTCMilliseconds().toString()).toString('base64');
    const Crypto = require('crypto');
    const tokenize = Crypto.randomBytes(48).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    const token = `${userID}.${date}.${tokenize}`;
    return token;
  }
}
  
module.exports = Token;
