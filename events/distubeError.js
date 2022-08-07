const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'error',
    type: 'music',
	execute(channe, e) {
        let embed = new EmbedBuilder()
            .setColor('#fc2e0f')
            .setTitle(`:exclamation: Error:`)
            .setDescription(`${e}`)
        queue.textChannel.send({ embeds: [embed] });
	},
};