const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song')
        .addStringOption(option => 
			option.setName('song')
				.setDescription('The song to play')
				.setRequired(true)
			),
	async execute(interaction, client, fs) {
        const song = interaction.options.getString("song");
        const channel = interaction.member.voice.channel;

        if(!channel) {
			let embed = new EmbedBuilder()
            	.setColor('#fc2b28')
            	.setTitle(`:skull: You need to join a vc first!`);
			await interaction.reply({ embeds: [embed] });
			return;
		}

		try {
			client.distube.play(channel, song, {
				member: interaction.member,
				textChannel: interaction.channel,
			});
			await interaction.reply({ content: `:thinking: Now trying to play the requested song...` });
		} catch (error) {
			let embed = new EmbedBuilder()
				.setColor('#fc2b28')
				.setTitle(`:skull: Error:`)
				.setDescription(`${error}`);
			await interaction.reply({ embeds: [embed] });
			return;
		}

	
		
		}        

};