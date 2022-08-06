const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current song'),
	async execute(interaction, client, distube) {
        const queue = distube.getQueue(interaction.guild);
		if (!queue || queue.songs.length < 2) await interaction.reply({ content: ':skull: There is nothing to skip to!', ephemeral: true }); 
		else {
			try {
				const song = await distube.skip(interaction.guild);
				await interaction.reply({ content: `:fast_forward: Skipped to ${song.name}!`});
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: `Error: @MasterDyl#4251 \n ${error}`, ephemeral: false });
			}
		}


    },
};