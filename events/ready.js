module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    console.log(`hello world. Logged in as ${client.user.tag}`);
	},
};