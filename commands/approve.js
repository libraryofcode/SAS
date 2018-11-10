const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  try {
    const msg = await message.channel.send('Authorizing....');
    const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
    const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : null;
    const thisUser = botuser.id;
    const thisRemove = botuser.roles.map(r => r.id);
    const thisChannel = client.channels.get('510616115144163333');
    const thisTime = new Date(message.createdAt).toLocaleString('en-us');
    const resolvedUser1 = (args[1] !== undefined) ? message.guild.members.get(args[1].match(/[0-9]/g).join('')) : null;
    const thisOwner = resolvedUser1 ? message.guild.members.get(resolvedUser1.id) : null;
  
    if (!botuser.user.bot) return msg.edit('I am not permitted to run this command on human members.');
    if (client.approved.get(thisUser)) {
      const clientMessage = await message.channel.send('``Purging database entry for this user since it was already verified...``');

      client.approved.delete(thisUser);
      clientMessage.delete(5000);
    }
    await botuser.removeRoles(thisRemove, 'Client user was approved by a SAA. (Type 1)');



    if (args[2] === '1') {

      client.approved.set(thisUser, {
        username: botuser.user.username,
        type: 1,
        staff: message.member.user.tag,
        time: thisTime,
        owner: thisOwner.user.tag
      });

      await botuser.addRoles(['477624490134732811', '468759692605128724'], 'Client user was approved by a SAA. (Type 1)');
    
      const embed1 = new Discord.RichEmbed();
      embed1.setTitle('CLIENT USER APPROVED');
      embed1.addField('Client User Name', botuser.user.username, true);
      embed1.addField('Client User Mention', `<@!${thisUser}>`, true);
      embed1.addField('Client User ID', thisUser, true);
      embed1.addField('Client Application Owner', thisOwner.user.tag, true);
      embed1.addField('Type', '1', true);
      embed1.addField('Approved By', message.member.user.tag, true);
      embed1.setFooter(client.user.username, client.user.avatarURL);
      embed1.setTimestamp();

      setTimeout(() => {
        if (botuser.roles.has('510615955206832134')) {
          botuser.removeRole('510615955206832134', 'Timeout check function');
        }
        if (botuser.roles.has('469506491800485891')) {
          botuser.removeRole('469506491800485891', 'Timeout check function');
        }
      }, 1000);

      thisChannel.send(embed1);
      client.users.get(thisOwner.id).send(embed1);
      message.delete();
      return msg.edit(`✅ ***Successfully verified ${botuser.user.tag} as type 1 client for ${thisOwner.user.tag}.***`);
    }

    else if (args[2] === '2') {
      client.approved.set(thisUser, {
        username: botuser.user.username,
        type: 2,
        staff: message.member.user.tag,
        time: thisTime,
        owner: thisOwner.user.tag
      });

      await botuser.addRoles(['477624490134732811', '468759692605128724', '468759793599774731'], 'Client user was approved by a SAA. (Type 2)');
    
      const embed2 = new Discord.RichEmbed();
      embed2.setTitle('CLIENT USER APPROVED');
      embed2.addField('Client User Name', botuser.user.username, true);
      embed2.addField('Client User Mention', `<@!${thisUser}>`, true);
      embed2.addField('Client User ID', thisUser, true);
      embed2.addField('Client Application Owner', thisOwner.user.tag, true);
      embed2.addField('Type', '2', true);
      embed2.addField('Approved By', message.member.user.tag, true);
      embed2.setFooter(client.user.username, client.user.avatarURL);
      embed2.setTimestamp();

      setTimeout(() => {
        if (botuser.roles.has('510615955206832134')) {
          botuser.removeRole('510615955206832134', 'Timeout check function');
        }
        if (botuser.roles.has('469506491800485891')) {
          botuser.removeRole('469506491800485891', 'Timeout check function');
        }
      }, 1000);

      thisChannel.send(embed2);
      message.delete();
      return msg.edit(`✅ ***Successfully verified ${botuser.user.tag} as type 2 client for ${thisOwner.user.tag}.***`);
    }

    else if (args[2] === '3') {
      client.approved.set(thisUser, {
        username: botuser.user.username,
        type: 3,
        staff: message.member.user.tag,
        time: thisTime,
        owner: thisOwner.user.tag
      });

      await botuser.addRoles(['477624490134732811', '468759692605128724', '468759793599774731', '469565725762125824'], 'Client user was approved by a SAA. (Type 3)');
    
      const embed3 = new Discord.RichEmbed();
      embed3.setTitle('CLIENT USER APPROVED');
      embed3.addField('Client User Name', botuser.user.username, true);
      embed3.addField('Client User Mention', `<@!${thisUser}>`, true);
      embed3.addField('Client User ID', thisUser, true);
      embed3.addField('Client Application Owner', thisOwner.user.tag, true);
      embed3.addField('Type', '3', true);
      embed3.addField('Approved By', message.member.user.tag, true);
      embed3.setFooter(client.user.username, client.user.avatarURL);
      embed3.setTimestamp();

      thisChannel.send(embed3);
      message.delete();
      setTimeout(() => {
        if (botuser.roles.has('510615955206832134')) {
          botuser.removeRole('510615955206832134', 'Timeout check function');
        }
        if (botuser.roles.has('469506491800485891')) {
          botuser.removeRole('469506491800485891', 'Timeout check function');
        }
      }, 1000);
      return msg.edit(`✅ ***Successfully verified ${botuser.user.tag} as type 3 client for ${thisOwner.user.tag}.***`);
    }

    else {
      const errorEmbed = new Discord.RichEmbed();
      errorEmbed.setTitle('APPROVAL TYPES');
      errorEmbed.setDescription('USAGE: `approve [bot] [owner] [type]`');
      errorEmbed.addField('Type 1', 'Standard bots (other boats, boats)', true);
      errorEmbed.addField('Type 2', 'Regular bots (other boats, boats, regular boats)', true);
      errorEmbed.addField('Type 3', 'Staff bots (other boats, boats, regular boats, staff boats)', true);
      errorEmbed.setFooter(client.user.username, client.user.avatarURL);
      errorEmbed.setTimestamp();
      return msg.edit(errorEmbed);
    }

  } catch (err) {
    const errorEmbed = new Discord.RichEmbed();
    errorEmbed.setTitle('APPROVAL TYPES --- [ERROR]');
    errorEmbed.setDescription('USAGE: `approve [bot] [owner] [type]`');
    errorEmbed.addField('Error', err, false);
    errorEmbed.addField('Type 1', 'Standard bots (other boats, boats)', true);
    errorEmbed.addField('Type 2', 'Regular bots (other boats, boats, regular boats)', true);
    errorEmbed.addField('Type 3', 'Staff bots (other boats, boats, regular boats, staff boats)', true);
    errorEmbed.setFooter(client.user.username, client.user.avatarURL);
    errorEmbed.setTimestamp();
    return message.channel.send(errorEmbed);
  }




};

exports.conf = {
  enabled: true,
  aliases: [],
};
  
exports.help = {
  name: 'approve',
  category: 'System',
  description: 'Approves a client user.',
  usage: 'approve'
};
