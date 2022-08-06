const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'addSong',
    type: 'distube',
	execute(queue, song) {
        let embed = new EmbedBuilder()
            .setColor('#0004ff')
            .setTitle(`📈 Added to the queue:`)
            .setDescription(`**${song.name}**  by **${song.uploader.name}** - [${song.formattedDuration}]`)
            .setThumbnail(`https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`)
            .setAuthor(`Requested by: ${song.user.tag}`)
            .setURL(song.url)
        queue.textChannel.send({ embeds: [embed] });
	},
};