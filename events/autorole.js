module.exports = {
	name: 'messageReactionAdd',
	type: 'discordJS',
	execute(guildMember) {
		console.log('poo');
		guildMember.roles.add(['868999279249866774'])
  .then(console.log)
  .catch(console.error);
	},
};