/*
* BOTID is the ID of your bot
* PREFIX is the new prefix you're setting
* TOKEN is your authorization token
* YOURID is your ID
*/

const axios = require('axios');

axios({
  method: 'put',
  url: 'https://sas.libraryofcode.ml/api/client/BOTID/PREFIX',
  headers: {
    authorization: 'TOKEN',
    owner: 'YOURID'
  } 
});

