//not finished yet
const { SlashCommandBuilder } = require('discord.js');
const profileModel = require("../models/profileSchema");
const { MessageEmbed } = require('discord.js');
const talkedRecently = new Set();


module.exports = {
	data: new SlashCommandBuilder()
		.setName('mine')
		.setDescription('Mines for MasterCoin'),
	async execute(interaction) {
		
    let profileData;
    try{
      //checks if there is a profile for the person that ran the command and makes one for that person if false
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
        await interaction.reply({ content: 'Hey! You didnt have a MasterCoin profile before but I made one for u :) Try running the command again!', ephemeral: true});
      } else {
          
      if (talkedRecently.has(interaction.user.id)) {
        await interaction.reply({ content: "Wait 2 hours before getting typing this again. - " + '@' + interaction.user.tag});
        } else {
          
          let payout;
          switch (profileData.gpu) {
            case "GT 650":
              payout = 5000;
              break;
            case "GTX 1080":
              payout = 10000;
              break;
            case "1690":
              payout = 15000;
              break;
            case "2080":
              payout = 20000;
              break;
            case "2080 Ti":
              payout = 23000;
              break;
            case "RTX 3060":
              payout = 30000;
              break;
            case "RTX 3070":
              payout = 35000;
              break;
            case "RTX 3080":
              payout = 40000;
              break;
            case "RTX 3090":
              payout = 45000;
              break;
            case "Intel GPU":
              payout = 1000000;
              break;
          }
          const response = await profileModel.findOneAndUpdate({
            userID: interaction.user.id
          }, {
            $inc: {
              wallet: payout,
            },
          });
          await interaction.reply({ content: `You earned 💰${payout} after mining with your ${profileData.gpu} `});
        talkedRecently.add(interaction.user.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(interaction.user.id);
        }, 7200000);
    }
      }
      }catch(err){
      console.log(err);
    }
    },

	};