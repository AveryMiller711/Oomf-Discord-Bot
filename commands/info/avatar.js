const Discord = require("discord.js");

module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    category: 'info',
    description: 'Sends the user\'s avatar.',
    cooldown: 5,
    execute(message, args){
        const user = message.mentions.users.first() || message.author;
        const embed = new Discord.MessageEmbed()
            .setTitle('**Avatar for ' + user.tag + '**')
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024}))
            .setColor(message.guild.member(user).displayHexColor);
        message.channel.send(embed);
    },
};