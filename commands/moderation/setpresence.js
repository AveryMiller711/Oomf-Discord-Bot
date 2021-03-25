const Discord = require('discord.js');
const {ownerid} = require('../../config.json');

module.exports = {
    name: 'setpresence',
    category: 'moderation',
    description: 'sets the presence for the bot.',
    guildOnly: true,
    args: true,
    usage: '< type: PLAYING, STREAMING, LISTENING, WATCHING, COMPETING > < name > ',
    execute(message, args){
        if(message.author.id != ownerid) {
            message.channel.send(`Only the bot owner, Avery, can use this command :pouting_cat:`);
        } else {
            _type = args[0].toUpperCase();
            if(_type != 'PLAYING' && _type != 'STREAMING' && _type != 'LISTENING' && _type != 'WATCHING' && _type != 'COMPETING'){
                message.channel.send('Invalid type');
            } else {
                size = args.length;
                _name = '';
                for(i = 1; i < size; ++i){
                    if(args[i] != args[-1]) args[i] = args[i].concat(' ');
                    _name = _name.concat(args[i]);
                }
                client.user.setPresence({ 
                    status: 'online',
                    activity: { 
                        type: _type, 
                        name: _name
                    }, 
                })
                    .then(message.channel.send(`__Updated Bot Presence:__\nType: ${_type}\nName: ${_name}`))
            }
            
        }
    },
};