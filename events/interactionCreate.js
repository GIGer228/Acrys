module.exports = {
    name: 'interactionCreate',
    execute(interaction){
        if (interaction.isStringSelectMenu()) {
            console.log(`${interaction.user.tag} selected a field *${interaction.customId}* in ${interaction.channel.name}`);
        }
        else if (interaction.isChatInputCommand()) {
            console.log(`${interaction.user.tag} called *\/${interaction.commandName}* command in ${interaction.channel.name}`);
        }
        else {
            console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        }
    }
};