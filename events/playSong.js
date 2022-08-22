const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'playSong',
    type: 'music',
	execute(queue, song) {
        const embed = new EmbedBuilder()
            .setColor('#15ec09')
            .setTitle(`<:music:928865296104689685> Playing:`)
            .setDescription(`**${song.name}**  by **${song.uploader.name}** - [${song.formattedDuration}]`)
            .setThumbnail(`https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`)
            .setURL(song.url)
            .setAuthor({ name: `Requested by: ${song.user.tag}`});
            
            
            
        queue.textChannel.send({ embeds: [embed] })
            .then(message => console.log(`started playing `))
            .catch(console.error);
	},
};