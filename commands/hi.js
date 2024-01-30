const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hi')
        .setDescription('Say hi to Acrys like a simple interaction as a first step.'),
        async execute(interaction){
            let developer = `MooN RavE`;
            let emoji = `\\ ( °~°)/`;
            await interaction.reply(`Hi there! How are you? Even if you answer me, I will not answer you back, because ${developer} \nhas not coded enough yet ${emoji}`);
        },
};