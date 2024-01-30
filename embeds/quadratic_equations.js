const {EmbedBuilder} = require('discord.js');

module.exports = {
    data: new EmbedBuilder()
        .setColor(0x7D12FF)
        .setAuthor({name: 'M[oo]N_R[av]E & Acrys', iconURL: 'https://drive.google.com/file/d/1pE6aLfav5XZgmgbeFkcWzYWzml01hnr4/view?usp=share_link'})
        .setTitle('quadratic_equations')
        .setDescription('Alright, let\'s come closer to those guys (it\'s pretty simple tbh)')
        .addFields(
            {name: '*Basics*', value: 'Some basic stuff here'},
            {name: '*How to solve it*', value: 'Some stuff here'},
            {name: '*More complex things*', value: 'Some stuff here'},
        )
        .setFooter({text: 'Enjoy learning and practice. See ya o/'})
};