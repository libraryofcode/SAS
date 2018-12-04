/*
* USERID is the ID of the user you're pulling up information for.
*/

const axios = require('axios');

axios({
  method: 'get',
  url: 'https://sas.libraryofcode.ml/api/member/USERID',
  headers: {
    authorization: '446067825673633794'
  }
});

