const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'error',
    type: 'distube',
	execute(channe, e) {
        let embed = new MessageEmbed()
            .setColor('#fc2e0f')
            .setTitle(`:exclamation: Error:`)
            .setDescription(`${e}`)
        queue.textChannel.send({ embeds: [embed] });
	},
};