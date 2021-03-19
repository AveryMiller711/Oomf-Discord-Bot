const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'masskick',
    category: 'moderation',
    description: 'Mass kick command.',
    guildOnly: true,
    args: true,
    usage: '< quantity | all | role >',
    execute(message, args){
        if(!message.member.hasPermission('KICK_MEMBERS')){
            return message.reply(`You do not have permission to use \`masskick\``);
        }
        if (args.length) {
            if((args%1)===0) {
                
                const filter = (reaction, user) => {
                    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
                };

                message.channel.send(`Are you sure you want to kick ${args} guild members?`)
                    .then(function(message) {
                        message.react('👍')
                        message.react('👎')
                        message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first();

                                if(reaction.emoji.name === '👍'){
                                    message.channel.send(`Kicking ${args} guild members...`);
                                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', errpr));
                                } else {
                                    message.channel.send(`Aborted command.`);
                                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', errpr));
                                }
                            })
                            .catch(collected => {
                                message.channel.send(`Aborted command.`);
                                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', errpr));
                            });
                    });
                
            } else if(args == 'all') {
                message.channel.send(`Kicking all guild members...`);
            } else if(message.mentions.roles) {
                let role = message.mentions.roles.first();
                let membersWithRole = message.guild.roles.cache.get(role.id).members;
                message.channel.send(`Kicking ${membersWithRole.size} guild members with the ${args} role...`);
                role.members.forEach(user => {
                    if(user.kickable){
                        message.channel.send(`Kicking ${user.user.username}`);
                    } else {
                        message.channel.send(`Cannot kick ${user.user.username}. Moving on...`);
                    }
                });
                message.channel.send(`**Targets eliminated.**`)
            } else {
                message.channel.send('Unspecified quantity');
            }
        } else {
            message.reply('ERR: No quantity given!');
        }
    },
};