/*
* YOURID is your user ID.
* YOURTOKEN is your authorization token.
* ROLEID is the role ID of the role you're wanting. 
*/

const axios = require('axios');

axios({
  method: 'put',
  url: 'https://sas.libraryofcode.ml/api/member/YOURID/roles/ROLEID',
  headers: {
    authorization: 'YOURTOKEN'
  }
});

