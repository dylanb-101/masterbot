const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'finish',
    type: 'distube',
	execute(queue) {
        let embed = new MessageEmbed()
            .setColor('#09efd8')
            .setTitle(`:partying_face: Finished:`)
            .setDescription(`Finished the queue! **/play** to play a new song!`)
        queue.textChannel.send({ embeds: [embed] });
	},
};