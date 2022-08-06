const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'searchNoResult',
    type: 'distube',
	execute(message, query) {
        let embed = new EmbedBuilder()
            .setColor('#fc2e0f')
            .setTitle(`:exclamation: Error:`)
            .setDescription(`I couldn't find any results for **${query}** | Try the playlist linked instead!`)
            .setURL(`https://youtube.com/playlist?list=PLZxdxAmnhla4xhElqgENDnANBks04qtAN`)
        queue.textChannel.send({ embeds: [embed] });
	},
};