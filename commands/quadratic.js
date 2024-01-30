const {SlashCommandBuilder} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('quadratic')
        .setDescription('Let me solve an (ax^2 + bx + c = 0) equation. (in real numbers)')
        .addNumberOption(option => option
            .setName('value_of_a')
            .setDescription('Enter 1 if there is no factor before x^2.')
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName('value_of_b')
            .setDescription('Enter 1 if there is no factor before x.')
        )
        .addNumberOption(option => option
            .setName('value_of_c')
            .setDescription('Enter 0 if there is no number after bx')
        ),
    async execute(interaction){
        let a = interaction.options.getNumber('value_of_a');
        let b = interaction.options.getNumber('value_of_b');
        let c = interaction.options.getNumber('value_of_c');

        b = (typeof(b) == typeof(null)) ? 0 : b;
        c = (typeof(c) == typeof(null)) ? 0 : c;

        let D = Math.pow(b, 2) - 4*a*c, x0, x1, x2;
        let equation, solution;

        if (b != 0 && c != 0){
            equation = `${a}(x^2) + (${b})x + (${c})`;
        }else if (b != 0 && c == 0){
            equation = `${a}(x^2) + (${b})x`;
        }else if (b == 0 && c != 0){
            equation = `${a}(x^2) + (${c})`;
        }else{
            equation = `${a}(x^2)`;
        }

        if (D > 0){
            x1 = (-b - Math.sqrt(D))/(2*a);
            x2 = (-b + Math.sqrt(D))/(2*a);
            solution = `your equation has **two** real roots: \`${x1}\` and \`${x2}\`.`;
        }else if (D == 0){
            x0 = -b/(2*a);
            solution = `your equation has only **one** real solution: \`${x0}\`.`;
        }else{
            solution = `there's **no** *real* solution for this equation.`;
        }
        await interaction.reply(`If your equation looks like this: \`${equation}\`,` + 
                                "\nthen " + solution);
    },
};