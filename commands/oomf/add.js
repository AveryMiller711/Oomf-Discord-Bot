const Discord = require("discord.js");
var fs = require('fs');

module.exports = {
    name: 'add',
    category: 'oomf',
    description: 'Add a user to your Oomf List.',
    cooldown: 5,
    execute(message, args){
        try{
            if(fs.existsSync('./databases/userList.json')){
                var userArray = require('./databases/userList.json');
            }
        } catch(err) {
            console.error(err);
            var userArrayFile = fs.openSync('./databases/userList.json', 'a');
            var userArray = [];
        }
        
    }
};