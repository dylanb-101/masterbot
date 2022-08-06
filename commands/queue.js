const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Gets the current queue!'),
	async execute(interaction, client, distube) {
		const queue = distube.getQueue(interaction.guild);
        if (!queue) {
            await interaction.reply({ content: ':skull: The queue is empty!', ephemeral: true });
        } else {
            const q = queue.songs
                .map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
                .join("------\n")
                await interaction.reply({ content: `📆 **Queue**\n${q}`});
        }
	},
};