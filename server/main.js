const client = require('../index.js');
class server {
  constructor() {
    /*const thisApp = require('./server/main.js');
    thisApp();*/
    const express = require('express');
    const app = express();
    //const client = require('../index.js');
    const port = 80;
    const server = app.listen(port, function() { //eslint-disable-line no-unused-vars
      console.log(`API is now running on port ${port}`);
    });
    app.get('/api', function(req, res) {
      res.sendStatus(403);
    });
    app.get('/cdn/:file', function(req, res) {
      res.status(200).sendFile(path.join(__dirname + `/cdn/${req.params.file}`));
    });
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/system/home/home.html'));
    });
    app.get('/garnet/help', function(req, res) {
      res.status(301).redirect('http://garnet.libraryofcode.ml:8800');
    });
    app.get('/api/client/:id', function(req, res) {
      const thisUser = req.params.id;
      if (!client.approved.get(thisUser)) return res.sendStatus(404);
      if (req.headers.authorization !== '446067825673633794')
        return res.status(403).send('Unauthorized access, please contact your system administrator.');
      let prefix;
      try {
        prefix = client.approved.get(thisUser, 'prefix');
      }
      catch (err) {
        prefix = err;
      }
      const thisObject = {
        client: {
          name: client.approved.get(thisUser, 'username'),
          id: thisUser,
          owner: client.approved.get(thisUser, 'owner'),
          prefix: prefix
        },
        approval: {
          type: client.approved.get(thisUser, 'type'),
          staff: client.approved.get(thisUser, 'staff'),
          time: client.approved.get(thisUser, 'time')
        }
      };
      res.status(200).send(thisObject);
    });
    app.put('/api/client/:id/:prefix', function(req, res) {
      const thisUser = client.guilds.get('446067825673633794').members.get(req.params.id);
      if (!thisUser.user.bot)
        return res.status(405).send('Cannot edit a regular member.');
      const owner = req.headers.owner;
      let thisOwner;
      try {
        thisOwner = client.guilds.get('446067825673633794').members.get(owner).user.tag;
      }
      catch (err) {
        return res.sendStatus(404);
      }
      if (client.approved.get(thisUser.id, 'owner') !== thisOwner)
        return res.status(403).send('Cannot authorize client owner.');
      if (client.tokens.get(owner) !== req.headers.authorization)
        return res.status(403).send('Authorization error');
      const prefix = req.params.prefix;
      console.log(prefix);
      client.approved.set(thisUser.id, prefix, 'prefix');
      res.status(200).send(`Prefix for ${thisUser.user.tag} edited to ${prefix}`);
    });
    app.get('/api/member/:id', function(req, res) {
      const thisUser = client.guilds.get('446067825673633794').members.get(req.params.id);
      if (req.headers.authorization !== '446067825673633794')
        return res.status(403).send('Unauthorized access, please contact your system administrator.');
      const thisObject = {
        user: {
          username: thisUser.user.username,
          discriminator: thisUser.user.discriminator,
          id: thisUser.user.id,
          avatar: thisUser.user.avatarURL,
          createdAt: new Date(thisUser.user.createdAt).toLocaleString('en-us'),
          bot: thisUser.user.bot
        },
        member: {
          nickname: thisUser.displayName,
          joinedAt: new Date(thisUser.joinedAt).toLocaleString('en-us'),
          //permissions: thisUser.permissions,
          //roles: thisUser.roles,
          highestRole: thisUser.highestRole.name,
          lastSeen: new Date(thisUser.lastMessage.createdAt).toLocaleString('en-us')
        }
      };
      res.status(200).send(thisObject);
    });
    app.get('/api/token/:id', function(req, res) {
      if (req.headers.authorization !== client.config.adminAuth)
        return res.status(403).send('Unauthorized access, this is only usable by the systems administrator.');
      try {
        client.guilds.get('446067825673633794').members.get(req.params.id);
      }
      catch (err) {
        return res.status(400).send('Member not found.');
      }
      /*const rand = function() {
        return Math.random().toString(36).substr(2);
      };
      const token = function() {
        return rand() + rand() + rand();
      };*/
      const Token = require('./system/class/token.js');
      const token = new Token(req.params.id);
      client.tokens.set(req.params.id, token);
      res.status(200).send(client.tokens.get(req.params.id));
    });
    app.post('/api/member/:id/', function(req, res) {
      const thisUser = client.guilds.get('446067825673633794').members.get(req.params.id);
      if (req.headers.authorization !== client.tokens.get(req.params.id))
        return res.status(403);
      const newNick = req.headers.nick;
      thisUser.setNickname(newNick, `Request with API | Authorization: ${req.headers.authorization}`).catch(e => console.log(e));
      res.sendStatus(200);
    });
    const path = require('path');
    app.get('/docs', function(req, res) {
      res.redirect('/docs/home');
    });
    app.get('/docs/home', function(req, res) {
      res.sendFile(path.join(__dirname + '/templates/home.html'));
    });
    app.get('/docs/client', function(req, res) {
      res.sendFile(path.join(__dirname + '/templates/client.html'));
    });
    app.get('/docs/member', function(req, res) {
      res.sendFile(path.join(__dirname + '/templates/member.html'));
    });
    app.get('*', function(req, res) {
      res.status(404).sendFile(path.join(__dirname + '/system/home/404.html'));
    });
  }
}
module.exports = server;
