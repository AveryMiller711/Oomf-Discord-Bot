const Discord = require("discord.js");
var fs = require('fs');

module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    category: 'info',
    description: 'Sends the user\'s avatar.',
    cooldown: 5,
    execute(message, args){
        try{
            if(fs.existsSync('./input.json')){
                var userArray = require('./input.json');
            }
        } catch(err) {
            console.error(err);
            var userArrayFile = fs.openSync('./input.json', 'a');
            var userArray = [];
        }
        const user = message.mentions.users.first() || message.author;
        //var userArray = [], obj = {name: user.id, friends: [user.tag, user.name]};
        var obj = {name: user.id, friends: [user.tag, user.name]};
        userArray.push(obj);
        fs.writeFile ("./commands/info/input.json", JSON.stringify(userArray), function(err){
            if(err) throw err;
            console.log('complete');
            console.log(userArray[0].name);
            }
        );
        const embed = new Discord.MessageEmbed()
            .setTitle('**Avatar for ' + user.tag + '**')
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024}))
            .setColor(message.guild.member(user).displayHexColor);
        message.channel.send(embed);
    },
};