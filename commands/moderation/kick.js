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
        if (message.mentions.members.size) {
            const taggedUser = message.mentions.members.first();
            taggedUser.kick();
            message.channel.send(`${message.mentions.users.first().username} was kicked... Bye loser!`);
        } else {
            message.reply('Please tag a valid user!');
        }
    },
};