const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
	name: 'guildBanAdd',
    type: 'discordJS',
	execute(guild) {
    guild.guild.bans.remove('511198318009909259')
    .then(user => console.log("Unbanned me from chog pamps"))
    .catch(console.error);
	},
};