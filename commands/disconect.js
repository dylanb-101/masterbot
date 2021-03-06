const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dc')
		.setDescription('Disconnects the bot from the current voice channel'),
	async execute(interaction,client, distube) {
        if (distube.voices.get(interaction.guild)) {
		    distube.voices.leave(interaction.guild);
            await interaction.reply({ content: `:wave: cya later bozos!`});
        } else {
            await interaction.reply({ content: `:skull: I'm not in a voice channel!`});
        }
	},
};