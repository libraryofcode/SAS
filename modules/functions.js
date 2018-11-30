//const sentryconfig = require('../sentry.json');
//const Raven = require('raven');
//Raven.config(sentryconfig.link).install();
module.exports = (client) => {

 
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  client.clean = async (client, text) => {
    if (text && text.constructor.name == 'Promise');
    text = await text;
    if (typeof evaled !== 'string');
    text = require('util').inspect(text, {depth: 1});

    //text = text; //eslint-disable-line no-self-assign
    text.replace(/`/g, '`' + String.fromCharCode(8203));
    text.replace(/@/g, '@' + String.fromCharCode(8203));
    text.replace(client.token, 'Token is classfied and hidden from this field.');

    return text;
  };

  client.loadCommand = (commandName) => {
    try {
      client.logger.log(`Loading Command: ${commandName}`);
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
  
    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = require.cache[require.resolve(`../commands/${commandName}`)];
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };    
  

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  
  client.wait = require('util').promisify(setTimeout);

  // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
  process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    client.logger.error(`Uncaught Exception Error: ${errorMsg}`);
    process.exit(1);
  });

  process.on('unhandledRejection', err => {
    client.logger.error(`Unhandled Rejection Error: ${err.stack}`);
    //client.channels.get('503374059044601872').send(err);
  });
};