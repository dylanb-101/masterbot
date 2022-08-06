//not working
const { SlashCommandBuilder } = require('discord.js');




module.exports = {
	data: new SlashCommandBuilder()
		.setName('img')
		.setDescription('Gets the top picture from google!')
    .addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')
			.setRequired(true)),
	async execute(interaction) {
		
    const input = SlashCommandStringOption

    await interaction.reply(`Here is your picture of  input`);
	},
};

