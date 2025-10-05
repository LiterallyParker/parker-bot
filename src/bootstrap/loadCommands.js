const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

module.exports = (client) => {
    client.commands = new Collection();
    const commandsPath = path.join(__dirname, '../commands');

    const loadFolder = (folderPath) => {
        const entries = fs.readdirSync(folderPath);

        for (const entry of entries) {
            const entryPath = path.join(folderPath, entry);
            const stats = fs.statSync(entryPath);

            if (stats.isDirectory()) {
                loadFolder(entryPath);
            } else if (entry.endsWith('.js')) {
                delete require.cache[require.resolve(entryPath)];
                const command = require(entryPath);

                if (!command.data || !command.execute) {
                    console.warn(`Skipping invalid command: ${entry}`);
                    continue;
                }

                client.commands.set(command.data.name, command);
            }
        }
    };

    loadFolder(commandsPath);
    console.log(`Loaded ${client.commands.size} commands.`);
};