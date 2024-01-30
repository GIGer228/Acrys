const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('word')
        .setDescription('Lets you say a word in Game of Words')
        .addStringOption(option =>
            option.setName('word')
                  .setDescription('The word you want to say')
                  .setRequired(true)),
        async execute(interaction){
                const Word = interaction.options.getString('word');
                const author = interaction.user;
                await interaction.reply(`${author} has just said a new word: ${Word}`);
            },
};