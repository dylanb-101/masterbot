const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Joins a voice channel'),
	async execute(interaction) {
        distube.play(message, args.join(' '));

        await interaction.reply({ content: 'Pong!', ephemeral: true});
	},
};