const { Client, GatewayIntentBits, Collection, Events, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

if (!process.env.DISCORD_TOKEN) {
    console.error("Missing DISCORD_TOKEN in .env file");
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User, Partials.GuildMember]
});


// --- Load commands locally ---
client.commands = new Collection();
const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));

for (const folder of commandFolders) {
    const folderPath = path.join(__dirname, 'commands', folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        let command;
        try {
            delete require.cache[require.resolve(filePath)];
            command = require(filePath);
        } catch (error) {
            console.error(`Error loading command "${file}":`, error);
            continue;
        }

        if (!command.data || !command.execute) {
            console.warn(`Command ${filePath} missing data/execute. Skipping.`);
            continue;
        }

        client.commands.set(command.data.name, command);
    }
};

// -- Load events locally ---
const eventsPath = path.join(__dirname, 'events');
for (const folder of fs.readdirSync(eventsPath)) {
    const folderPath = path.join(eventsPath, folder);
    for (const file of fs.readdirSync(folderPath).filter(file => file.endsWith('.js'))) {
        const event = require(path.join(folderPath, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
            continue;
        }
        client.on(event.name, (...args) => event.execute(...args, client));
    }
};

// --- Graceful shutdown ---
const shutdown = async () => {
    console.log("\nShutting down bot...");
    client.destroy();
    process.exit(0);
};

process.on('SIGINT', shutdown);  // Ctrl + C
process.on('SIGTERM', shutdown); // Kill command
process.on('uncaughtException', (err) => {
    console.error("Uncaught Exception:", err);
    shutdown();
});
process.on('unhandledRejection', (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    shutdown();
});

// --- Login ---
client.login(process.env.DISCORD_TOKEN);