const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculate')
        .setDescription('Let me help you with some simple math operations.')
        .addNumberOption(option => option
            .setName('first_digit')
            .setDescription('The first summand/minuend/dividend or base of exponent/logarithm (0 for ln) of the operation.')
            .setRequired(true)
        )
        .addIntegerOption(option => option
            .setName('operation')
            .setDescription('What do you want to do with the given digit?')
            .setRequired(true)
            .addChoices(
                {name : 'plus', value: 0},
                {name : 'minus', value: 1},
                {name : 'times', value: 2},
                {name : 'divided by', value: 3},
                {name : 'to the power of', value: 4},
                {name : 'logarithm of', value: 5},
            )
        )
        .addNumberOption(option => option
            .setName('second_digit')
            .setDescription('The second summand/reducer/factor/divider/exponent or number of logarithm.')
            .setRequired(true)
        ),
        async execute(interaction){
            const a = interaction.options.getNumber('first_digit');
            const b = interaction.options.getNumber('second_digit');
            const o = interaction.options.getInteger('operation');
            let answer, operation, reply;

            switch(o){
                case 0:
                    answer = a + b;
                    operation = a + ' plus ' + b;
                    break;
                case 1:
                    answer = a - b;
                    operation = a + ' minus ' + b;
                    break;
                case 2:
                    answer = a * b;
                    operation = a + ' times ' + b;
                    break;
                case 3:
                    answer = a / b;
                    operation = a + ' divided by ' + b;
                    break;
                case 4:
                    answer = a ** b;
                    operation = a + ' to the power of ' + b;
                    break;
                case 5:
                    if ((a == 2) || (a == 10)){
                        answer = log(a, b);
                        operation = 'Logarithm base ' + a + ' of ' + b;
                    }else if (a == 0){
                        answer = Math.log(b);
                        operation = 'Natural logarithm of ' + b;
                    }else{
                        answer = log(a,b) + '.\n*my algorithms are sick, sowwyy* ( ._.)' +
                        '\nI\'m good at calculating simple things tho :)';
                        operation = 'Logarithm base ' + a + ' of ' + b;
                    }
                    break;
                default:
                    answer = ' ahm.. There was an error while calculating ( ;_;)';
                    operation = 'The result';
            }
            reply = (typeof(answer) == typeof(1.0)) ? 'is equal to' : 'is __approximate__';
            await interaction.reply(`${operation} ${reply} ${answer}`);
        },
};
function log(base, digit){
    return (digit > 1 ? 1 + log(base, digit/base) : 0);
}