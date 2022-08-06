module.exports = {
	name: 'interactionCreate',
	type: 'discordJS',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};