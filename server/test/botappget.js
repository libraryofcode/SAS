const axios = require('axios');

axios({
  method: 'get',
  url: 'https://sas.libraryofcode.ml/api/client/BOTID', // "BOTID" is the user ID the bot.
  headers: {
    authorization: '446067825673633794'
  }
});

