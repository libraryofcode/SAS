const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Authorizing...');
  if (!args[0]) return msg.edit('I need a client user to pull up data for.');
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : null;
  const thisUser = botuser.id;
  

  if (!botuser.user.bot) return msg.edit('***Error: I do not have data on human members.');
  
  const embed = new Discord.RichEmbed();
  embed.setTitle('CLIENT USER DATA');
  try {
    embed.setThumbnail(botuser.user.avatarURL);
  } catch (err) {
    embed.setThumbnail(client.user.avatarURL);
  }
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
    embed.addField('Approval Type', client.approved.get(thisUser, 'type'), true);
  } catch (err) {
    embed.addField('Approval Type', err, true);
  }
  try {
    embed.addField('Approved By', client.approved.get(thisUser, 'staff'), true);
  } catch (err) {
    embed.addField('Approved By', err, true);
  }
  try {
    embed.addField('Approved At', client.approved.get(thisUser, 'time'), true);
  } catch (err) {
    embed.addField('Approved At', err, true);
  }
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();

  msg.edit(embed).catch(err => msg.edit(err));
};

exports.conf = {
  enabled: true,
  aliases: [],
};
    
exports.help = {
  name: 'data',
  category: 'System',
  description: 'Gets data for an approved client user.',
  usage: 'data'
};