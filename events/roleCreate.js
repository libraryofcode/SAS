const Discord = require('discord.js');

module.exports = async (client, role) => {
  if (!role.managed) return;
  const thisChannel = client.channels.get('510616115144163333');


  setTimeout(() => {
    const thisRole = role.members.map(r => r.id);
    role.guild.members.get(thisRole[0]).kick('Managed role was created and client is not authorized.');
    const embed = new Discord.RichEmbed();
    embed.setTitle('AUTO-KICKED UNAUTHORIZED CLIENT');
    embed.setColor('RED');
    embed.setDescription('Auto-kicked an unauthorized client because the client user had a managed role upon server join.');
    try {
      embed.addField('Client User Name', role.guild.members.get(thisRole[0]).user.username, true);
    } catch (err) {
      embed.addField('Client User Name', err, true);
    }
    try {
      embed.addField('Client User ID', role.guild.members.get(thisRole[0]), true);
    } catch (err) {
      embed.addField('Client User ID', err, true);
    }
    try {
      embed.addField('Client Created At', role.guild.members.get(thisRole[0]).user.createdAt);
    } catch (err) {
      embed.addField('Client Created At', err, true);
    }
    embed.addField('Timeout', '5000 MILLISECONDS', true);
    embed.setFooter(client.user.username, client.user.avatarURL);
    embed.setTimestamp();
  
    thisChannel.send(embed);


      
  }, 5000);

};