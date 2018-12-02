if (Number(process.version.slice(1).split('.')[0]) < 8) throw new RangeError('Node 8.0.0 or higher is required. Update Node on your system.');

const Discord = require('discord.js'); 
//const sentryconfig = require('./sentry.json');
//const Raven = require('raven');
//Raven.config(sentryconfig.link).install();
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');

const client = new Discord.Client({
  fetchAllMembers: true,
  disableEveryone: true}); 


client.config = require('./config.json');

client.logger = require('./modules/Logger');

require('./modules/functions.js')(client);

client.commands = new Enmap();
client.aliases = new Enmap();


client.settings = new Enmap({
  name: 'settings', 
  autoFetch: true
});

client.tokens = new Enmap({
  name: 'tokens',
  autofetch: true,
  fetchAll: true
});

client.blackList = new Enmap({
  name: 'blackList',
  autofetch: true,
  fetchAll:true
});

client.approved = new Enmap({
  name: 'approved',
  autofetch: true,
  fetchAll: true
});

client.approvedUsers = new Enmap({
  name: 'approvedUsers',
  autofetch: true,
  fetchAll: true
});

client.whiteList = new Enmap({
  name: 'whiteList',
  autofetch: true,
  fetchAll: true
});

client.raidMode = new Enmap({
  name: 'raidMode', 
  autoFetch: true,
  fetchAll: true
});


const init = async () => {

  const { join } = require('path');
  const commands = await readdir(join(__dirname, './commands/'));
  client.logger.log(`Loading a total of ${commands.length} commands.`);
  commands.forEach(f => {
    if (!f.endsWith('.js' || '.ts')) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });



  const evtFiles = await readdir(join(__dirname, './events/'));
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });


  client.login(client.config.token);

};

init();

setTimeout(() => {
  /*const thisApp = require('./server/main.js');
  thisApp();*/
  const express = require('express');
  const app = express();
  //const client = require('../index.js');
  const port = 8895;

  const server = app.listen(port, function() { //eslint-disable-line no-unused-vars
    console.log(`API is now running on port ${port}`);
  });



  app.get('/client/:id', function(req, res) {
    const thisUser = req.params.id;
    if (req.headers.authorization !== '446067825673633794') return res.status(403).send('Unauthorized access, please contact your system administrator.');

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
  app.get('/member/:id', function(req, res) {
    const thisUser = client.guilds.get('446067825673633794').members.get(req.params.id);
    if (req.headers.authorization !== '446067825673633794') return res.status(403).send('Unauthorized access, please contact your system administrator.');

    const thisObject = {
      user: {
        username: thisUser.user.username,
        discriminator: thisUser.user.discriminator,
        id: thisUser.user.id,
        avatar: thisUser.user.avatarURL,
        createdAt: new Date (thisUser.user.createdAt).toLocaleString('en-us'),
        bot: thisUser.user.bot
      },
      member: {
        nickname: thisUser.displayName,
        joinedAt: new Date (thisUser.joinedAt).toLocaleString('en-us'),
        //permissions: thisUser.permissions,
        //roles: thisUser.roles,
        highestRole: thisUser.highestRole.name,
        lastSeen: new Date (thisUser.lastMessage.createdAt).toLocaleString('en-us')
      }
    };
    res.status(200).send(thisObject);
  });
  app.get('/token/:id', function(req, res) {
    if (req.headers.authorization !== client.config.adminAuth) return res.status(403).send('Unauthorized access, this is only usable by the systems administrator.');
    try {
      client.guilds.get('446067825673633794').members.get(req.params.id);
    } catch (err) {
      return res.status(400).send('Member not found.');
    }
    const rand = function() {
      return Math.random().toString(36).substr(2); 
    };
  
    const token = function() {
      return rand() + rand(); 
    };

    client.tokens.set(req.params.id, token().toUpperCase());
    res.status(200).send(client.tokens.get(req.params.id));
  
  });

  app.post('/member/:id/', function(req, res) {
    console.log(req.params);
    console.log(req.body);
    //console.log(req.params.id);
    const thisUser = client.guilds.get('446067825673633794').members.get(req.params.id);
    if (req.headers.authorization !== client.tokens.get(req.params.id)) return res.status(403);
    const newNick = req.body;
    console.log(newNick);

    thisUser.setNickname(newNick, 'Request done via API').catch(e => console.log(e));
    res.status(201).send('Done.');
  }); 
}, 10000);


module.exports = client;