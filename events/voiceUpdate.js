const { vcID } = require('../config.json');

module.exports = {
	name: 'voiceStateUpdate',
    type: 'discordJS',
	execute(oldState, newState) {
        console.log('hello ');
        if (newState.channelId == vcID) {
            newState.channel.setName(`${newState.channel.members.size} People`)
                .then(newChannel => console.log(newChannel.name));
            newState.channel.edit(`${newState.channel.members.size} People`);
                
            console.log(newState.channel.members.size + ' new');
            
        } else if(oldState.channelId == vcID) {
            oldState.channel.setName(`${oldState.channel.members.size} People`)
                .then(newChannel => console.log(newChannel.name));
            console.log(oldState.channel.members.size + ' old');
        }
	},
};