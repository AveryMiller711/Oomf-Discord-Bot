

module.exports = {
    name: 'test',
    category: 'moderation',
    description: 'Test command.',
    cooldown: 5,
    execute(message, args){
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply(`You do not have permission to use \`test\``);
        }

        message.guild.members.fetch().then(fetchedMembers => {
            fetchedMembers.forEach(member => {
                if(member.user.bot){
                    console.log('bot');
                }
            });
        });

        message.channel.send(`Tested!`);
    },
};