const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Authorizing...');
  try {
    const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
    const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : null;
    const thisUser = botuser.id;
    const thisChannel = client.channels.get('510616115144163333');

    if (!botuser.user.bot) throw new EvalError('UNAUTHORIZED');
    if (client.blackList.get(thisUser)) return msg.edit('***Error: This user is already blacklisted.***');

    const embed = new Discord.RichEmbed();
    embed.setTitle('CLIENT USER BLACKLISTED');
    embed.addField('Client User Name', botuser.user.username, true);
    embed.addField('Client User Mention', `<@!${thisUser}>`, true);
    embed.addField('Client User ID', thisUser, true);
    embed.addField('Blacklisted By', message.member.user.tag, true);
    embed.setFooter(client.user.username, client.user.username);
    embed.setTimestamp();

    thisChannel.send(embed);

    if (client.approved.get(thisUser)) {
      client.approved.delete(thisUser);
    }

    client.blackList.set(thisUser, {
      reason: args[1],
      staff: message.member.user.tag
    });

    await botuser.ban({
      days: 7,
      reason: 'Client user was denied by an SAA. (softban)'
    });
  

    msg.edit(`✅ ***${botuser.user.tag} has been denied.***`);
  } catch (err) {
    msg.edit(`\`ERROR\`\n ***${err}***`);
  }
};

exports.conf = {
  enabled: true,
  aliases: ['ban'],
};
    
exports.help = {
  name: 'blacklist',
  category: 'System',
  description: 'Blacklists a client user.',
  usage: 'blacklist'
};