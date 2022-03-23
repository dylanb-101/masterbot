const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dosbca')
		.setDescription('Tells you how many days of school are left'),
	async execute(interaction) {
        let date = new Date();
        let today = new Date(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`)
        let endOfSchool = new Date('6/25/22');
        let DIT = endOfSchool.getTime() - today.getTime();
        let DID = DIT / (1000 * 3600 * 24) + 1;
		await interaction.reply({ content: `There are ${DID} days of school left in BCA`, ephemeral: false});
	},
};