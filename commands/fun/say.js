module.exports = {
    name: 'say',
    category: 'fun',
    description: 'Make the bot say something.',
    cooldown: 3,
    guildOnly: true,
    args: true,
    usage: '< message content > < OPTIONAL: --silent >',
    execute(message, args){

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
        
    },
};