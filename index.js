fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const config = require('./config.json');
const myUserId = '84484653687267328';
const mongoose = require('mongoose');
const channel = '791118442686185515';
const DisTube = require('distube');
const { prefix } = require('./config.json');
const { MessageEmbed } = require('discord.js');
const { RepeatMode } = require('distube');
const mc = require('minecraft-server-util');



//perms for bot. very important if a new command dosent work its prly this
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES
] });

const distube = new DisTube.default(client, {
	nsfw: true,
	searchSongs: 1
});


//event handler or just events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
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
		await command.execute(interaction, client, distube, mc);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	
});




// sets status
client.on('ready', function() {
  client.user.setActivity(config.activity, { type: 'STREAMING' });
});

//distube start
client.on('messageCreate', async message => {
if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();

//distuve commands
if (command === 'play') {
	if (!message.member.voice.channel) {
		return message.channel.send(`:skull: get in a vc `);
	}
	if (args == '') {
		return message.channel.send(`:skull: bozo forgor the song `);
	}
	distube.play(message, args.join(' '));
//	message.channel.send(`<:music:928865296104689685> playing: ${song.name}`);
} else if (command === 'queue' || command === 'q') {
	const queue = distube.getQueue(message);
    if (!queue) return message.channel.send(`:skull: queue is empty`);
	const q = queue.songs
		.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
		.join("------\n");
		message.channel.send(`📆 **Queue**\n${q}`);
} else if (command === 'skip' || command === 's') {
	const queue = distube.getQueue(message);
	if (!queue) return message.channel.send(`:skull: maybe add something to the queue first`);
	try {
		const song = await queue.skip();
		message.channel.send(`⏭️ skipped now im playing:\n${song.name}`);
	} catch (e) {
		message.channel.send(`:skull: wtf did u do: ${e}`);
	}
} else if (command === 'disconnect' || command === 'dc') {
	distube.voices.leave(message);
	message.channel.send(`👋cya later bozos`);
} else if (command === 'loop' || command === 'l') {
	const queue = distube.getQueue(message);
	distube.setRepeatMode(queue);
	message.channel.send(`🔁 Set loop mode to ${RepeatMode}`);
}


});
//distube events 
distube
    .on("playSong", (queue, song) =>
        queue.textChannel.send(
            `<:music:928865296104689685> playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
                song.user}`
        )
    )
    .on("addSong", (queue, song) =>
        queue.textChannel.send(
            `📈 added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        )
    )
    .on("searchNoResult", (message, query) => message.channel.send(":skull: couldnt find:" + query))
    .on("error", (channel, e) => {
        channel.send(`:skull: got an error: ${e.toString().slice(0, 1974)}`);
        console.error(e);
    })
    .on("finish", queue => queue.textChannel.send("Finished!"));

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
  if (message.author.id == '424028935752515595')
  message.channel.send('https://cdn.discordapp.com/attachments/752544235059937363/934120595925401650/video0.mp4');
  //done!
});
//troll stuff

//if (message.author.id == '424028935752515595') {
	//	message.channel.send('https://cdn.discordapp.com/attachments/752544235059937363/934120595925401650/video0.mp4');
	//}
});

//mal dc

//client.on('voiceStateUpdate', (newMember) => {
//	if (newMember.id == '792557819537915954') {
//		newMember.setChannel(null);
//	}
//});

//make sure this is the last thing 
client.login(token);