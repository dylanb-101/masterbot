const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song')
        .addStringOption(option => 
			option.setName('song')
				.setDescription('The song to play')
				.setRequired(true)
			),
	async execute(interaction, client, distube) {
        const song = interaction.options.getString("song");
        const channel = interaction.member.voice.channel;

        if(!interaction.member.voice.channel) {
			await interaction.reply({content: ':skull: get in a vc to use this command'})
		} else {
			distube.play(channel, song, {
				member: interaction.member,
				textChannel: interaction.channel,
			});
			await interaction.reply({content: `:thinking: Now trying to play the song...`, ephemeral: false});
		}
        

	},
};