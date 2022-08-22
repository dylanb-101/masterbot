const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dc')
		.setDescription('Disconnects the bot from the current voice channel'),
	async execute(interaction, client) {
        if (client.distube.voices.get(interaction.guild)) {
		    client.distube.voices.leave(interaction.guild);
            await interaction.reply({ content: `:wave: cya later bozos!`});
        } else {
            await interaction.reply({ content: `:skull: I'm not in a voice channel!`});
        }
	},
};