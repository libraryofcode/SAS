const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Loading...');
  if (!args[0]) return msg.edit('I need a client user to pull up data for.');
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : null;
  const thisUser = botuser.id;
  if (!botuser.user.bot) return msg.edit('I am not permitted to run this command on human members.');
  if (client.approved.get(thisUser) === undefined) return msg.edit('This client application is not in the database.');


  const prefix = args.splice(1).join(' ');

  client.approved.set(thisUser, prefix, 'prefix');

  msg.edit(`Prefix for ${botuser.user.tag} successfully edited to \`${prefix}\``);

  const embed = new Discord.RichEmbed();
  embed.setTitle('CLIENT PREFIX CHANGED');
  try {
    embed.addField('Client User Name', client.approved.get(thisUser, 'username'), true);
  } catch (err) {
    embed.addField('Client User Name', err, true);
  }
  try {
    embed.addField('Client User ID', thisUser, true);
  } catch (err) {
    embed.addField('Client User ID', err, true);
  } 
  try {
    embed.addField('Client Application Owner', client.approved.get(thisUser, 'owner'), true);
  } catch (err) {
    embed.addField('Client Application Owner', err, true);
  }
  try {
    embed.addField('Client Prefix', client.approved.get(thisUser, 'prefix'), true);
  } catch (err) {
    embed.addField('Client Prefix', err, true);
  }
  try {
    embed.addField('Reponsible User', message.member.user.tag, true);
  } catch (err) {
    embed.addField('Responsible User', err, true);
  }
  client.channels.get('510616115144163333').send(embed);
};

exports.conf = {
  enabled: true,
  aliases: ['setprefix'],
};
    
exports.help = {
  name: 'prefix',
  category: 'System',
  description: 'Sets the prefix for a client user.',
  usage: 'prefix'
};