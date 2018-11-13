exports.run = async (client, message) => {

  const msg = await message.channel.send('Locking...');

  client.channels.get('485680288123584525').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('468759629334183956').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('511430482710495232').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('508006539768889354').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506970598631538708').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506970616029773825').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506955507051921408').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506955269423628288').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506955565843480598').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506970804668465183').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506962968517541888').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506962932924678144').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506962951014580234').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506962899592413205').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('506970839439245313').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });
  client.channels.get('491066378728767488').overwritePermissions('446067825673633794', {
    SEND_MESSAGES: false
  });

  msg.edit(':check: ***Successfully locked the server.***');

};

exports.conf = {
  enabled: true,
  aliases: [],
};
    
exports.help = {
  name: 'lockdown',
  category: 'System',
  description: 'Locks down the server.',
  usage: 'lockdown'
};