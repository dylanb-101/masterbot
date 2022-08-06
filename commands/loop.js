const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Changes the current loop mode')
		.addStringOption(option =>
			option.setName('mode')
				.setDescription('Sets the loop mode, No loop, loop song, or loop queue')
				.setRequired(false)
				.addChoices(
					{ name: 'None', value: '0' },
					{ name: 'Song', value: '1' },
					{ name: 'Queue', value: '2' }
				)),
	async execute(interaction,client, distube) {
		const queue = distube.getQueue(interaction.guild);
		const rptMode = () => {
			let mode = queue.repeatMode;
			if (mode == '0') {
				return 'None!';
			} else if (mode == '1') {
				return 'Repeat current song!';
			} else if (mode == '2') {
				return 'Repeating the queue!';
			} else {
				return 'idk something tweakin the code';
			}
		};
        if(!queue) {
            await interaction.reply({ content: `:skull: I'm not in a voice channel!`});
        } else {
			if(!interaction.options.getString('mode')) {
            distube.setRepeatMode(queue);
			await interaction.reply({ content: `:repeat: Repeat mode set to ${rptMode()}`});

        	} else {
				distube.setRepeatMode(queue, Number(interaction.options.getString('mode')));
				await interaction.reply({ content: `:repeat: Repeat mode set to ${rptMode()}`});

			}
		}
	},
};