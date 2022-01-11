const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('Opens the shop'),
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!', ephemeral: true});
	},
};