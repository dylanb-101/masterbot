const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'error',
    type: 'music',
	execute(channel, err) {
        let embed = new EmbedBuilder()
            .setColor('#fc2e0f')
            .setTitle(`:exclamation: Error:`)
            .setDescription(`${err}`);
            
        if (channel) {
            channel.send({ embeds: [embed] });
            console.log(err);
        } else {
            console.log(err);
        }
        
	},
};