const {ownerid} = require('../../config.json');

module.exports = {
    name: 'masskick',
    category: 'moderation',
    description: 'Mass kick command.',
    guildOnly: true,
    args: true,
    usage: '< quantity | all | role >',
    execute(message, args){
        if(!message.member.hasPermission('KICK_MEMBERS') && message.author.id != ownerid){
            return message.reply(`You do not have permission to use \`masskick\``);
        }
        if (args.length) {

            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            const timedOut = 60000;
            const memberList = message.guild.members;

            if((args%1)===0 && args > 0) {

                message.channel.send(`Are you sure you want to kick ${args} guild members?`)
                    .then(function(message) {
                        message.react('✅')
                        message.react('❌')
                        message.awaitReactions(filter, { max: 1, time: timedOut, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first();

                                if(reaction.emoji.name === '✅'){
                                    message.channel.send(`Kicking ${args} guild members...`);
                                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                    message.guild.members.fetch().then(fetchedMembers => {
                                        count = 0;
                                        fetchedMembers.forEach(member => {
                                            if(count >= args || member.user.bot) return;
                                            if(member.kickable){
                                                message.channel.send(`Kicking ${member.user.username}`);
                                                member.kick();
                                                count += 1;
                                            } else {
                                                message.channel.send(`Cannot kick ${member.user.username}. Moving on...`);
                                            }
                                        });
                                        message.channel.send(`Finished.`);
                                    });
                                } else {
                                    message.channel.send(`:warning: Command aborted :warning: `);
                                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                }
                            })
                            .catch(collected => {
                                message.channel.send(`:warning: Timed out: command aborted :warning:`);
                                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                            });
                    });
                
            } else if(args == 'all') {
                memberList.fetch().then(fetchedMembers => {
                    message.channel.send(`Are you sure you want to kick ${fetchedMembers.size} guild members?`)
                        .then(function(message) {
                            message.react('✅')
                            message.react('❌')
                            message.awaitReactions(filter, { max: 1, time: timedOut, errors: ['time'] })
                                .then(collected => {
                                    const reaction = collected.first();

                                    if(reaction.emoji.name === '✅'){
                                        message.channel.send(`Kicking ${args} guild members...`);
                                        message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                        message.guild.members.fetch().then(fetchedMembers => {
                                            fetchedMembers.forEach(member => {
                                                if(member.user.bot) return;
                                                if(member.kickable){
                                                    message.channel.send(`Kicking ${member.user.username}`);
                                                    member.kick();
                                                } else {
                                                    message.channel.send(`Cannot kick ${member.user.username}. Moving on...`);
                                                }
                                            });
                                        });
                                    } else {
                                        message.channel.send(`:warning: Command aborted :warning: `);
                                        message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                    }
                                })
                                .catch(collected => {
                                    message.channel.send(`:warning: Timed out: command aborted :warning:`);
                                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                });
                        });
                });
                
            } else if(message.mentions.roles) {
                let role = message.mentions.roles.first();
                let membersWithRole = message.guild.roles.cache.get(role.id).members;

                message.channel.send(`Are you sure you want to kick ${membersWithRole.size} guild members with the ${args} role?`)
                    .then(function(message) {
                        message.react('✅')
                        message.react('❌')
                        message.awaitReactions(filter, { max: 1, time: timedOut, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first();

                                if(reaction.emoji.name === '✅'){
                                    message.channel.send(`Kicking ${membersWithRole.size} guild members with the ${args} role...`);
                                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                    role.members.forEach(member => {
                                        if(member.user.bot) return;
                                        if(member.kickable){
                                            message.channel.send(`Kicking ${member.user.username}`);
                                            member.kick();
                                        } else {
                                            message.channel.send(`Cannot kick ${member.user.username}. Moving on...`);
                                        }
                                    });
                                    message.channel.send(`**Targets eliminated.**`)
                                } else {
                                    message.channel.send(`:warning: Command aborted :warning: `);
                                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                }
                            })
                            .catch(collected => {
                                message.channel.send(`:warning: Timed out: command aborted :warning:`);
                                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                            });
                    });

            } else {
                message.channel.send('Unspecified quantity');
            }
        } else {
            message.reply('ERR: No quantity given!');
        }
    },
};