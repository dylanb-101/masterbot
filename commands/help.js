const { SlashCommandBuilder } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('gets info on all the commands'),
	async execute(interaction) {
		
    let helpEmbed = new MessageEmbed()
    .setColor('#f0ff24')
    .setTitle(`ur welcome`)
    .addFields(
      { name: '**help:**', value: 'gives u this :skull:', inline: true},
      { name: '**bal:**', value: 'Shows how much Mastercoin you have', inline: true},
      { name: '**img:**', value: 'dont run this its broken rn', inline: true},
      {name: '**iq:**', value: 'Shows your iq(100% not a random number)', inline: true},
      { name: '**mine:**', value: 'mine for Mastercoin, profit is based on the GPU you have'},
      { name: '**ping:**', value: 'Responds with pong', inline: true},
      { name: '**start:**', value: 'Starts your Mastercoin mining journey!', inline: true},
          )

    await interaction.reply({ content: 'Here is some info on all the commands!', embeds: [helpEmbed]});
	},
};