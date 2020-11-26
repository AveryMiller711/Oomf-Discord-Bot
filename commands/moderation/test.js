module.exports = {
    name: 'test',
    category: 'moderation',
    description: 'Test command.',
    cooldown: 5,
    execute(message, args){
        message.channel.send(`Tested!`);
    },
};