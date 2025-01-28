const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});
const config = require('./config.json');

client.commands = new Collection();
client.aliases = new Collection();

fs.readdir('./events/', (err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
        let eventHandler = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
    });
});

client.login(config.token);