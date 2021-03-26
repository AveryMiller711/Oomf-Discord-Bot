const {ownerid} = require('../../config.json');

module.exports = {
    name: 'kick',
    category: 'moderation',
    description: 'Kick command.',
    guildOnly: true,
    args: true,
    usage: '< user >',
    execute(message, args){
        if(!message.member.hasPermission('KICK_MEMBERS') && message.author.id != ownerid){
            return message.reply(`You do not have permission to use \`kick\``);
        }
        if (message.mentions.members.size) {
            const taggedUser = message.mentions.members.first();
            if(taggedUser.kickable) {
                taggedUser.kick();
                message.channel.send(`${message.mentions.users.first().username} was kicked... Bye loser!`);
            } else {
                message.reply("I cannot kick this member!");
            }
        } else {
            message.reply('Please tag a valid user!');
        }
    },
};