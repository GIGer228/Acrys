//Require the necessary discord.js classes
const {Client, GatewayIntentBits} = require('discord.js');
const {token} = require('./config.json');
//Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});
//When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Acrys client is ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const  {commandName} = interaction;

    if (commandName === 'ping'){
        await interaction.reply('Pong!');
    } else if (commandName === 'server'){
        await interaction.reply(`Server name: ${interaction.guild.name}\n` + 
                                `Total members: ${interaction.guild.memberCount}\n` +
                                `Created at : ${interaction.guild.createdAt}\n` +
                                `Verification level: ${interaction.guild.verificationLevel}\n`);
    } else if (commandName === 'user'){
        await interaction.reply(`Username: ${interaction.user.username}\n` +
                                `User tag: ${interaction.user.tag}\n` + 
                                `User id: ${interaction.user.id}\n` + 
                                `Joined at: ${interaction.user.createdAt}`);
    }
});

//Login to Discord with your client's token
client.login(token);