const { SlashCommandBuilder } = require('discord.js');

const profileModel = require("../models/profileSchema");
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('bal')
		.setDescription('Checks your MasterCoin balance'),
	async execute(interaction) {
		
    let profileData;
    try{
      profileData = await profileModel.findOne({ userID: interaction.user.id})
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
        wallet = profileData.wallet;
        bank = profileData.bank;
        total = wallet + bank;
        let balEmbed = new MessageEmbed()
        .setColor('#4efc03')
        .setTitle(`${interaction.user.tag}'s Balance is:`)
        .addFields(
          { name: 'Wallet:', value: '💰' + wallet, inline: true},
          { name: 'Bank:', value: `💰` + bank, imline: true},
          { name: 'Total: ', value: `💰` + total, inline: true},
          )
        await interaction.reply({ embeds: [balEmbed] });
      }
      }catch(err){
      console.log(err)
    }
    },

	};