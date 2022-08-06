const { SlashCommandBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('sets the status for the bot(only for me')
    .addStringOption(option =>
		option.setName('type')
			.setDescription(' Playing, watching etc.')
			.setRequired(true)
			.addChoices(
				{ name: 'Playing', value: 'PLAYING' },
				{ name: 'Watching', value: 'WATCHING' },
				{ name: 'Listening', value: 'LISTENING' },
				{ name: 'Streaming', value: 'STREAMING' },
				{ name: 'Competing', value: 'COMPETING' },
			))
    .addStringOption((option) =>
		option.setName('status')
			.setDescription('What do u want the status to be')
			.setRequired(true)),  
	async execute(interaction, client) {
		if (interaction.user.id === '511198318009909259' ||'741343008145801307' || '611372334498054174' || '543508185785303042') {
      client.user.setActivity(interaction.options.getString("status"), { type: interaction.options.getString("type") });
      
      await interaction.reply({ content: `Set the status to: ${interaction.options.getString('type')} ${interaction.options.getString("status")}`, ephemeral: false});
    } else {
      await interaction.reply({ content: 'Did you really think I would let anyone set the status :clown:', ephemeral: true});
    }

  
	},
};