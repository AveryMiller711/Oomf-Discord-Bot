const Discord = require("discord.js");
const { prefix } = require('../../assets/config.json');
const fs = require('fs');
const infoFiles = fs.readdirSync('./commands/info').filter(file => file.endsWith('.js'));
const moderationFiles = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));

module.exports = {
    name: 'help',
    category: 'info',
    description: 'List all of the commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args){
        const data = [];
        const info = [];
        const mod = [];
        const { commands } = message.client;

        if(!args.length){
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            for(const file of infoFiles){
                const command = require(`./${file}`);
                info.push(command.name);
            }

            for(const file of moderationFiles){
                const command = require(`../moderation/${file}`);
                mod.push(command.name);
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor('Command List', 'https://images-ext-2.discordapp.net/external/yA3ZlHkCIPgvkMiDmGE2M7GjoAFiobtgi5ZL6nCJj0g/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/776580934014337064/3da94dc96faa75d75dd1ddaa8ce226c1.png')
                .addFields(
                    { name: 'Info', value: info},
                    { name: 'Moderation', value: mod},
                );

            return message.channel.send(embed)
                .catch(error => {
		            console.error(error);
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command){
            return message.reply('That\'s not a valid command.');
        }

        data.push(`**Name:** ${command.name}`);

        if(command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    },
};