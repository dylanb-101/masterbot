const { SlashCommandBuilder } = require('discord.js');;
const talkedRecently = new Set();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('iq')
		.setDescription('Give you your Iq!'),
  async execute(interaction) {
     await interaction.reply('Your iq is '+ Math.round( Math.random() * (1000 - 0) + 0));
  }
};