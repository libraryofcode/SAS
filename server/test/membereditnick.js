/*
* YOURUSERID is, well... Your ID. What did you expect?
* TOKEN is your authorization token.
* NICK is the new nickname you want to use.
*/

const axios = require('axios');

axios({
  method: 'post',
  url: 'http://sas.libraryofcode.ml/api/member/YOURUSERID',
  headers: {
    authorization: 'TOKEN',
    nick: 'NICK'
  }
});