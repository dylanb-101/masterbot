module.exports = {
	name: 'ready',
	once: true,
	type: 'discordJS',
	execute(client) {
    console.log(`hello world. Logged in as ${client.user.tag}`);
	},
};