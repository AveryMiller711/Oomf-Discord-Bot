module.exports = {
    name: 'kick',
    category: 'moderation',
    description: 'Kick command.',
    guildOnly: true,
    args: true,
    usage: '<user>',
    execute(message, args){
        if(!message.member.hasPermission('KICK_MEMBERS')){
            return message.reply(`You do not have permission to use \`kick\``);
        }
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        } else {
            message.reply('Please tag a valid user!');
            message.channel.send('>fish');
        
        }
    },
};