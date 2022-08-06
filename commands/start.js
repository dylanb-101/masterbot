const { SlashCommandBuilder } = require('discord.js');
const profileModel = require("../models/profileSchema");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Starts Your MasterCoin mining journey!'),
	async execute(interaction) {
		
    let profileData;
    try{
      profileData = await profileModel.findOne({ userID: interaction.user.id});
      if(!profileData){
        let profile = await profileModel.create({
          userID: interaction.user.id,
          serverID: interaction.guildId,
          wallet: 1000,
          bank: 0,
          gpu: 'GT 650',
        });
        profile.save();
        await interaction.reply({ content: 'Welcome to your MasterCoin mining journey!', ephemeral: true});
      }else {
        await interaction.reply({ content: 'You fucking dumb ass you already have an account :clown:', ephemeral: true});
      }
    }catch(err){
      console.log(err);
    }

	},
};