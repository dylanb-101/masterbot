const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('Opens the shop'),
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!', ephemeral: true});
	},
};