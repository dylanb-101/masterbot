const { SlashCommandBuilder } = require('@discordjs/builders');
const DisTube = require('distube');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song')
        .addStringOption(option => option.setName('song').setDescription('The song to play').setRequired(true)),
	async execute(interaction, distube, client, Distube) {
        const music = interaction.options.getString("song").slice(0, 100);
        const channel = interaction.member.voice.channel;

        interaction.client.distube.playVoiceChannel(interaction.member.voice.channel, music, {
			textChannel: interaction.channel,
			member: interaction.member
		  });
        

	},
};