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
            if((args%1)===0) {
                message.channel.send(`Kicking ${args} guild members...`);
            } else if(args == 'all') {
                message.channel.send(`Kicking all guild members...`);
            } else if(message.mentions.roles) {
                let role = message.mentions.roles.first();
                let membersWithRole = message.guild.roles.cache.get(role.id).members;
                message.channel.send(`Kicking ${membersWithRole.size} guild members with the ${args} role...`);
                message.channel.send(message.guild.roles.cache.get(role.id).members.map(m=>m.user.username));
            } else {
                message.channel.send('Unspecified quantity');
            }
        } else {
            message.reply('ERR: No quantity given!');
        }
    },
};