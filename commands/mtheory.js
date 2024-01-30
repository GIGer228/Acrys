const {SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');

const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('math')
                    .setPlaceholder('Choose your theme...')
                    .addOptions(
                        {
                            label: 'Quadratic Equations',
                            description: 'All you need to know about quadratic equations',
                            value: 'quadratic_equations',
                        },
                    ),
            );

module.exports = {
    data: new SlashCommandBuilder()
            .setName('mtheory')
            .setDescription('I can give you a short brief about the most popular math themes')
            ,
            async execute(interaction){
                await interaction.reply({content: 'What do you want to learn / repeat?', ephemeral: true, components: [row]});
            }
};

