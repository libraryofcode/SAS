const Discord = require('discord.js');

module.exports = async (client, member) => {
  const thisChannel = client.channels.get('510616115144163333');

  if (client.raidMode.get('446067825673633794') === true) {

    member.send('***The Library of Code is under a raid mode.***\n Hi, we do apologize for the inconvience. You have been softbanned from the server because the server is in raid mode. If you are reading this that means you are not a bot. Simply wait a couple of minutes before joining back.\n You may also DM <@!278620217221971968> for assistance.');
    await member.ban({
      days: 7,
      reason: 'Guild member was banned due to raidmode.'
    });
  
    await client.guilds.get().unban(member, {
      reason: 'Ban was a softban.'
    });

    const banEmbed = new Discord.RichEmbed();
    banEmbed.setTitle('AUTO-SOFTBANNED USER DUE TO RAID MODE');
    banEmbed.setColor('RED');
    banEmbed.addField('Guild Member', member.user.tag, true);
    banEmbed.addField('Guild Member ID', member.id, true);
    banEmbed.setFooter(client.user.username, client.user.avatarURL);
    banEmbed.setTimestamp();

    return thisChannel.send(banEmbed);
  }

  if (!member.user.bot) {
    return client.channels.get('485680288123584525').send(`Hi <@!${member.id}>! Welcome to Library of Code. You can find all of our rules in the "Welcome Center" category, and assign your own roles in <#506977089250000896>. If you need any help, DM <@!457750238208327691>.`);
  }

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


  /*if (await member.roles.size > 1) {
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
      
    return thisChannel.send(failEmbed);*/
  else {


    try {
      if (!member.user.bot) return;
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