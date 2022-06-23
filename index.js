const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const config = require('./config.json');
const mongoose = require('mongoose');
const DisTube = require('distube');
const { prefix } = require('./config.json');
const { cookie } = require('./config.json');



//perms for bot. very important if a new command dosent work its prly this
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES
] });

const distube = new DisTube.default(client, {
	nsfw: true,
	searchSongs: 1,
	youtubeCookie: cookie
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
		distube.once(event.name, (...args) => event.execute(...args));
	} else if(event.type == 'distube') {
		distube.on(event.name, (...args) => event.execute(...args));
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
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client, distube);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	
});




// sets status
client.on('ready', function() {
  client.user.setActivity(config.activity, { type: 'STREAMING' });
});


client.on('messageCreate', async message => {
if (message.author.bot || !message.guild || !message.content.startsWith(prefix) || message.author.id == '741343008145801307') return;

const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();




//distube commands
if (command === 'play') {
	
	return message.channel.send(`:warning:only nerds use these old commands :nerd: use **/play** to be sexy `)
	//if (!message.member.voice.channel) {
	//	return message.channel.send(`:skull: get in a vc `);
	//}
	//if (args == null) {
	//	return message.channel.send(`:skull: bozo forgor the song `);
	//}
	//distube.play(message, args.join(' '));
//	message.channel.send(`<:music:928865296104689685> playing: ${song.name}`);
} else if (command === 'queue' || command === 'q') {
	//const queue = distube.getQueue(message);
    //if (!queue) return message.channel.send(`:skull: queue is empty`);
	//const q = queue.songs
	//	.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
	//	.join("------\n");
	//	message.channel.send(`📆 **Queue**\n${q}`);
	return message.channel.send(`:warning:only nerds use these old commands :nerd: use **/queue** to be sexy`)
} else if (command === 'skip' || command === 's') {
	//const queue = distube.getQueue(message);
	//if (!queue) return message.channel.send(`:skull: maybe add something to the queue first`);
	//try {
	//	const song = await queue.skip();
	//	message.channel.send(`⏭️ skipped now im playing:\n${song.name}`);
	//} catch (e) {
	//	message.channel.send(`:skull: wtf did u do: ${e}`);
	//}
	return message.channel.send(`:warning:only nerds use these old commands :nerd: use **/skip** to be sexy`)
} else if (command === 'disconnect' || command === 'dc') {
	//distube.voices.leave(message);
	//message.channel.send(`👋cya later bozos`);
	return message.channel.send(`:warning:only nerds use these old commands :nerd: use **/dc** to be sexy`)
} else if (command === 'loop' || command === 'l') {
	//const queue = distube.getQueue(message);
	//distube.setRepeatMode(queue);
	//const rptMode = () => {
	//	let mode = queue.repeatMode;
	//	if (mode == '0') {
	//		return 'None!'
	//	} else if (mode == '1') {
	//		return 'Repeat current song!'
	//	} else if (mode == '2') {
	//		return 'Repeating the queue!'
	//	} else {
	//		return 'idk something tweakin the code';
	//	}
	//};
	return message.channel.send(`:warning:only nerds use these old commands :nerd: use **/loop** to be sexy`)
}


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