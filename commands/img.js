//not working
const { SlashCommandStringOption } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('@discordjs/builders');



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

