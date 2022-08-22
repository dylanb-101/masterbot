const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const config = require('./config.json');
const mongoose = require('mongoose');

const { DisTube } = require('distube');

const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SpotifyPlugin } = require('@distube/spotify');

const { cookie } = require('./config.json');



//perms for bot. very important if a new command dosent work its prly this
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates
] });


client.distube = new DisTube(client, {
	nsfw: true,
	youtubeCookie: cookie,
	emitAddSongWhenCreatingQueue: false,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true,
		}),
		new YtDlpPlugin()
	]
});



//event handler or just events
const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once && event.type == 'discordJS') {
		client.once(event.name, (...args) => event.execute(...args));
	} else if(event.type == 'discordJS') {
		client.on(event.name, (...args) => event.execute(...args));
	} else if(event.once && event.type == 'distube') {
		client.distube.once(event.name, (...args) => event.execute(...args));
	} else if(event.type == 'music') {
		client.distube.on(event.name, (...args) => event.execute(...args));
	}
}



//for events handler ^

//command handler
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

//for command handler ^

//for database
mongoose.connect(config.mongoDB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> {
  console.log('connected to db');
}).catch ((err)=> {
  console.log(err);
});

// command runner
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client, fs);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	
});




// sets status
client.on('ready', function() {
  client.user.setActivity(config.activity, { type: 'STREAMING' });
});



//logs messages
client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;
  if (!client.application?.owner) await client.application?.fetch();
  console.log(`User ${message.author.tag} in channel ${message.channel.name} said: ` + message.content);

 	fs.appendFile('chat.log', ("\n" + `User ${message.author.tag} in channel ${message.channel.name} said: ` + message.content), err => {
  		if (err) {
    		console.error(err);
    		return;
  		} 
	});
});

//make sure this is the last thing 
client.login(token);