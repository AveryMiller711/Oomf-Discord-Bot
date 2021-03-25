const Discord = require("discord.js");

module.exports = {
    name: 'runtime',
    category: 'info',
    description: 'Total runtime of the bot.',
    execute(message, args){

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const embed = new Discord.MessageEmbed()
            .setTitle('**__Uptime:__**')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setThumbnail(global.client.user.displayAvatarURL())
            .setDescription(`${days}d ${hours}h ${minutes}m ${seconds}s`)
            .setColor(message.guild.member(message.author).displayHexColor);
        message.channel.send(embed);
        
    },
};