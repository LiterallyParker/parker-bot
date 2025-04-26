const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
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

const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));
for (const folder of commandFolders) {
    const folderPath = path.join(__dirname, 'commands', folder);
    if (fs.statSync(folderPath).isDirectory()) {
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            client.commands.set(command.name, command);
        }
    }
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

const shutdown = async () => {
    console.log("\nShutting down bot...");
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