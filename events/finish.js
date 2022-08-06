const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'finish',
    type: 'distube',
	execute(queue) {
        let embed = new EmbedBuilder()
            .setColor('#09efd8')
            .setTitle(`:partying_face: Finished:`)
            .setDescription(`Finished the queue! **/play** to play a new song!`)
        queue.textChannel.send({ embeds: [embed] });
	},
};