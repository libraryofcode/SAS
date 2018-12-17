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

client.bans = new Enmap({
  name: 'bans',
  autoFetch: true,
  fetchAll: true
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
  const start = require('./server/main.js');
  new start();
}, 3400);


module.exports = client;