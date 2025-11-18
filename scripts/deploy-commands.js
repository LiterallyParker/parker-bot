const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// --- Validate environment variables ---
if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID || !process.env.GUILD_ID) {
    console.error("Missing DISCORD_TOKEN, CLIENT_ID, or GUILD_ID in .env file");
    process.exit(1);
}

const commands = [];
// commands are stored under src/commands in this repo
const commandFolders = fs.readdirSync(path.join(__dirname, '..', 'src', 'commands'));

for (const folder of commandFolders) {
    const folderPath = path.join(__dirname, '..', 'src', 'commands', folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const commandPath = path.join(folderPath, file);
        try {
            const command = require(commandPath);
            if (command && command.data && command.execute) {
                commands.push(command.data.toJSON ? command.data.toJSON() : command.data);
            } else {
                console.warn(`Skipping invalid command (missing data/execute): ${commandPath}`);
            }
        } catch (err) {
            console.error(`Failed to load command ${commandPath}:`, err);
        }
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Refreshing application (/) commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();