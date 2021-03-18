module.exports = {
    name: 'masskick',
    category: 'moderation',
    description: 'Mass kick command.',
    guildOnly: true,
    args: true,
    usage: '<quantity | all>',
    execute(message, args){
        if(!message.member.hasPermission('KICK_MEMBERS')){
            return message.reply(`You do not have permission to use \`masskick\``);
        }
        if (args.length) {
            const quantity = args;
            message.channel.send(`You wanted to kick: ${args} people`);
        } else {
            message.reply('ERR: No quantity given!');
        }
    },
};