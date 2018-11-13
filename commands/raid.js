const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const thisChannel = client.channels.get('510616115144163333');
  const msg = await message.channel.send('Authenticating...');
  if (args[0] === 'on') {
    if (client.raidMode.get(message.guild.id) === 'true') return msg.edit('Raid mode is already on.');
    client.raidMode.set(message.guild.id, true);
    msg.edit('***Raid Mode has been enabled, all incoming users will be softbanned.***');

    const onEmbed = new Discord.RichEmbed();
    onEmbed.setTitle('RAID MODE ENABLED');
    onEmbed.setColor('ORANGE');
    onEmbed.addField('Enabled By', message.member.user.tag, true);
    try {
      onEmbed.addField('Reason', args.splice(1).join(' '), true);
    } catch (err) {
      onEmbed.addField('Reason', err, true);
    }
    onEmbed.setFooter(client.user.username, client.user.avatarURL);
    onEmbed.setTimestamp();
    
    thisChannel.send(onEmbed);
  }

  if (args[0] === 'off') {
    if (client.raidMode.get(message.guild.id) === 'false') return msg.edit('Raid mode is already off.');
    client.raidMode.set(message.guild.id, false);
    msg.edit('***Raid mode has been disabled.***');

    const offEmbed = new Discord.RichEmbed();
    offEmbed.setTitle('RAID MODE DISABLED');
    offEmbed.setColor('GREEN');
    offEmbed.addField('Disabled By', message.member.user.tag, true);
    try {
      offEmbed.addField('Reason', args.splice(1).join(' '), true);
    } catch (err) {
      offEmbed.addField('Reason', err, true);
    }
    offEmbed.setFooter(client.user.username, client.user.avatarURL);
    offEmbed.setTimestamp();
      
    thisChannel.send(offEmbed);
  }
  else {
    msg.edit('pls choose an option kthx')
  }
};