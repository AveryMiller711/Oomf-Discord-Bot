module.exports = {
    name: 'test',
    description: 'Test command.',
    cooldown: 5,
    execute(message, args){
        message.channel.send(`Tested!`);
    },
};