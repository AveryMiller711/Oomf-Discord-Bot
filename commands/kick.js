module.exports = {
    name: 'kick',
    description: 'Kick command.',
    args: true,
    usage: '<user>',
    execute(message, args){
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
          } else {
              message.reply('Please tag a valid user!');
          }
    },
};