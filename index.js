//Require Sequelize
const Sequelize = require('sequelize');
//Require the necessary discord.js classes
const {Client, Collection, GatewayIntentBits, Events, Embed, EmbedBuilder} = require('discord.js');
const {token, guildId} = require('./config.json');

//Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});

//Creating a Sequelize Database (required for words game)
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    //SQLite only
    storage: 'database.sqlite',
});
const Words = sequelize.define('words', {
    word: {
        type: Sequelize.STRING,
        unique: true,
    },
    author: Sequelize.STRING,
});

//Creating a Collection of commands
client.commands = new Collection();

const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    //Set a new item in the Collection
    //With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

//Creating a Collection of embeds
client.embeds = new Collection();

const embedsPath = path.join(__dirname, 'embeds');
const embedsFiles = fs.readdirSync(embedsPath).filter(file => file.endsWith('.js'));

for (const file of embedsFiles) {
    const filePath = path.join(embedsPath, file);
    const embed = require(filePath);
    //Set a new item in the Collection
    //with the key as the embed title and the value as the embed
    client.embeds.set(embed.data.title, embed);
}

//Setting up the event register
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles){
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once){
        client.once(event.name, (... args) => event.execute(... args));
    }else{
        client.on(event.name, (... args) => event.execute(... args));
    }
}
//Setting up the interactions listener
client.on('interactionCreate', async interaction => {
    //Select menu's choices listener
    if (interaction.customId === 'math') {
        const selectedTheme = interaction.values[0];
        const theoryNote = client.embeds.get(selectedTheme);

        await interaction.update({content: `Here\'s some useful information related to \`${selectedTheme}\` :books:`, ephemeral: true, embeds: [theoryNote], components: []});
    }
    //Commands execution
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try{
        await command.execute(interaction);
    }catch(error){
        console.log(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});
//Login to Discord with your client's token
client.login(token);