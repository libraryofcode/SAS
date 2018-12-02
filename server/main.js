function server() {
  const express = require('express');
  const app = express();
  const client = require('../index.js');
  const port = 3000;

  const server = app.listen(port, function() { //eslint-disable-line no-unused-vars
    console.log(`API is now running on port ${port}`);
  });

  app.get('/client/:id', function(req, res) {
    const thisUser = req.params.id;

    const thisObject = {
      client: {
        name: client.approved.get(thisUser, 'username'),
        id: thisUser,
        owner: client.approved.get(thisUser, 'owner')
      },
      approval: {
        type: client.approved.get(thisUser, 'type'),
        staff: client.approved.get(thisUser, 'staff'),
        time: client.approved.get(thisUser, 'time')
      }
    };
    res.status(200).send(thisObject);
  });
}
module.exports = server;

