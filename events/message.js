//const Discord = require('discord.js');

module.exports = async (client, message) => {

  if (message.member.roles.size > 1) {
    if (!message.member.roles.has('475817826251440128')) return;
  }

  if (message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;

  while (args[0] && args[0][0] === '-') {
    message.flags.push(args.shift().slice(1));
  }

  cmd.run(client, message, args);
};