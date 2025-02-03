const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const db = require("./models");
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.commands = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    client.commands.set(command.name, command);
};

client.once('ready', async () => {
    console.log("Bot online.");
});

client.on('messageCreate', (message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;
    
    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    if (client.commands.has(commandName)) {
        client.commands.get(commandName).execute(message, args);
    };
});

require("./schedule/taskRegistry");

db.sequelize.sync();

const shutdown = async () => {
    console.log("\nShutting down bot...");
    await db.sequelize.close(); // Close DB connection
    client.destroy(); // Properly close Discord client
    process.exit(0); // Exit process
};

process.on('SIGINT', shutdown);  // Ctrl + C
process.on('SIGTERM', shutdown); // Kill command
process.on('uncaughtException', (err) => {
    console.error("Uncaught Exception:", err);
    shutdown();
});

client.login(process.env.DISCORD_TOKEN);