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
            if((args%1)===0) {
                message.channel.send(`You wanted to kick ${args} people`);
            } else if(args == 'all') {
                message.channel.send(`You wanted to kick all people`);
            } else {
                message.channel.send('Unspecified quantity');
            }
        } else {
            message.reply('ERR: No quantity given!');
        }
    },
};