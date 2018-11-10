exports.run = async (client, message) => {
  //const thisMessage = '🏓 Pong!';
  const msg = await message.channel.send('🏓 Pong!');
      
  msg.edit(`🏓 Pong! \`${msg.createdTimestamp - message.createdTimestamp}ms\``);
};
  
exports.conf = {
  enabled: true,
  aliases: [],
};

exports.help = {
  name: 'ping',
  category: 'Bot Information',
  description: 'Pings the bot, without the embed.',
  usage: 'ping'
};