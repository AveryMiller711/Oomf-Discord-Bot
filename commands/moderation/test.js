

module.exports = {
    name: 'test',
    category: 'moderation',
    description: 'Test command.',
    cooldown: 5,
    execute(message, args){
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply(`You do not have permission to use \`test\``);
        }

        if(args.length){

            deleteMessage = false;
            if(args[args.length-1] === '--silent') {
                size = (args.length - 1);
                deleteMessage = true;
            } else {
                size = args.length;
            }

            saythis = '';
            for(i = 0; i < size; ++i){
                if(args[i] != args[-1]) args[i] = args[i].concat(' ');
                saythis = saythis.concat(args[i]);
            }
    
            message.channel.send(saythis);
            if(deleteMessage) message.delete();
        }
        
        message.channel.send(`Tested!`);
    },
};