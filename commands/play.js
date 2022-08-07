const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song')
        .addStringOption(option => 
			option.setName('song')
				.setDescription('The song to play')
				.setRequired(true)
			),
	async execute(interaction, client, fs, player) {
        const song = interaction.options.getString("song");
        const channel = interaction.member.voice.channel;

        if(!channel) {
			await interaction.reply({content: ':skull: get in a vc to use this command'})
		} else {
			try{
				

				await interaction.reply({content: `:thinking: Now trying to play the song...`, ephemeral: false});
			} catch(err) {
				await interaction.reply({content: `:skull: ${err}`, ephemeral: true});


				const fileContent = err;
				const path = `../errors/${Date.now()}.txt`;
				fs.writeFile(path, fileContent, (err) => {
					if (err) throw err;
					console.log(`The file ${path} has been saved!`);
				});
			}
		}
        

	},
};