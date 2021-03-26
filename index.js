const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

global.client = new Discord.Client();
client.commands = new Discord.Collection();

const infoFiles = fs.readdirSync('./commands/info').filter(file => file.endsWith('.js'));
const moderationFiles = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));

const cooldowns = new Discord.Collection();

for(const file of infoFiles){
    const command = require(`./commands/info/${file}`);
    client.commands.set(command.name, command);
}

for(const file of moderationFiles){
    const command = require(`./commands/moderation/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Chemtrails Over The Country Club',
            type: "LISTENING"
        },
    });
});

client.on('message', message => {

    if(message.mentions.has(client.user)){
        message.channel.send(`${message.author.toString()} dont @ me fat`);
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command) return;

    if(command.guildOnly && message.channel.type == 'dm'){
        return message.channel.send(`${message.author.toString()} I can't execute that command inside DMs!`);
    }

    if(command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author.toString()}!`;

        if(command.usage){
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply)
    }

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if(timestamps.has(message.author.id)){
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if(now < expirationTime){
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`${message.author.toString()} Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try{
        command.execute(message, args);
    } catch(error){
        console.error(error);
        message.channel.send(`${message.author.toString()} There was an error trying to execute that command.`)
    }
});

var cron = require("cron");
const { verseArray } = require("./verses.json");

function bibleVerse() {

    randomVerse = Math.floor(Math.random() * verseArray.length);
    verse = verseArray[randomVerse][0];

    client.guilds.cache.map(guild => {
        thischannel = guild.channels.cache.find(channel => channel.name === 'general' || channel.name === '✨▸general');
        
        try{
            thischannel.send(verse);
        } catch(error) {
            console.error(error);
        }
        
    });
}

function morning() {
    client.guilds.cache.map(guild => {
        thischannel = guild.channels.cache.find(channel => channel.name === 'general' || channel.name === '✨▸general');
        
        try{
            thischannel.send(`gm snap :heart:`);
        } catch(error) {
            console.error(error);
        }
        
    });
    bibleVerse();
}

function night() {
    client.guilds.cache.map(guild => {
        thischannel = guild.channels.cache.find(channel => channel.name === 'general' || channel.name === '✨▸general');
        
        try{
            thischannel.send(`gn snap :heart:`);
        } catch(error) {
            console.error(error);
        }
        
    });
    bibleVerse();
}

let sayVerseMorning = new cron.CronJob('00 00 08 * * *', morning);
let sayVerseNight = new cron.CronJob('00 00 23 * * *', night);
let sayVerseDay = new cron.CronJob('00 00 11,02,05,08 * * *', bibleVerse);

sayVerseMorning.start();
sayVerseNight.start();
sayVerseDay.start();

client.login(token);