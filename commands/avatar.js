module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    description: 'Sends the user\'s avatar.',
    cooldown: 5,
    execute(message, args){
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            message.channel.send(taggedUser.displayAvatarURL());
          } else {
              message.channel.send(message.author.displayAvatarURL());
          }
    },
};