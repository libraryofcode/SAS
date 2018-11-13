const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Locking...');

  const thisChannel = client.channels.get(args[0]);
  try {
    thisChannel.overwritePermissions(thisChannel, {
      SEND_MESSAGES: true
    });
  } catch (err) {
    msg.edit(err);
  }

  const embed = new Discord.RichEmbed();
  embed.setTitle('CHANNEL UNLOCK');
  embed.addField('Channel Name', thisChannel.name, true);
  embed.addField('Unocked by', message.member.user.tag, true);
  try {
    embed.addField('Reason', args.splice(1).join(' '), true);
  } catch (err) {
    embed.addField('Reason', err, true);
  }
  embed.setColor('GREEN');
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();

  client.channels.get('510616115144163333').send(embed);

  msg.edit(`✅ ***Successfully unlocked #${thisChannel.name}***`);
  message.delete();
};

exports.conf = {
  enabled: true,
  aliases: [],
};
      
exports.help = {
  name: 'unlock',
  category: 'System',
  description: 'Unlocks a specified channel.',
  usage: 'unlock [channel ID] [reason]'
};