const Discord = require('discord.js');

module.exports = async (client, member) => {
  const thisChannel = client.channels.get('510616115144163333');

  if (client.blackList.get(member.id)) {
    await member.ban({
      days: 7,
      reason: 'Client user was blacklisted.'
    });
    const failEmbed1 = new Discord.RichEmbed();
    failEmbed1.addTitle('AUTO-KICKED UNAUTHORIZED ADDED CLIENT');
    failEmbed1.setColor('RED');
    failEmbed1.setDescription('Client user was added with additional permissions.');
    failEmbed1.addField('Client User Name', `${member.user.username}#${member.user.discriminator}`, true);
    failEmbed1.addField('Client User Mention', `<@!${member.id}>`, true);
    failEmbed1.addField('Client User ID', member.id, true);
    failEmbed1.addField('Client Created At', new Date(member.user.createdAt).toLocaleString('en-us'), true);
    failEmbed1.addField('Blacklisted By', client.blackList.get(member.id, 'staff'), true);
    failEmbed1.setFooter(client.user.username, client.user.avatarURL);
    failEmbed1.setTimestamp();

    return thisChannel.send(failEmbed1);
  }


  if (await member.roles.size > 1) {
    await member.kick('Client user was added with roles.');
    const failEmbed = new Discord.RichEmbed();
    failEmbed.setColor('RED');
    failEmbed.addTitle('AUTO-KICKED UNAUTHORIZED ADDED CLIENT');
    failEmbed.setDescription('Client user was added with additional permissions.');
    failEmbed.addField('Client User Name', `${member.user.username}#${member.user.discriminator}`, true);
    failEmbed.addField('Client User Mention', `<@!${member.id}>`, true);
    failEmbed.addField('Client User ID', member.id, true);
    failEmbed.addField('Client Created At', new Date(member.user.createdAt).toLocaleString('en-us'), true);
    failEmbed.setFooter(client.user.username, client.user.avatarURL);
    failEmbed.setTimestamp();
      
    return thisChannel.send(failEmbed);
  } else {


    try {
      member.addRole('510615955206832134');
    } catch (err) {
      console.log(err);
    }

  
    const embed = new Discord.RichEmbed();
    embed.setTitle('UNAUTHORIZED CLIENT ADDED');
    embed.setColor('BLUE');
    embed.addField('Client User Name', `${member.user.username}#${member.user.discriminator}`, true);
    embed.addField('Client User Mention', `<@!${member.id}>`, true);
    embed.addField('Client User ID', member.id, true);
    embed.addField('Client Created At', new Date(member.user.createdAt).toLocaleString('en-us'), true);
    try {
      embed.addField('Client Roles', member.roles.map(r => r.name), true);
    } catch (err) {
      embed.addField('Client Roles', `${err}`, true);
    }
    embed.setFooter(client.user.username, client.user.avatarURL);
    embed.setTimestamp();

    thisChannel.send(embed);
  }

};