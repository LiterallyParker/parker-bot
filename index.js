const { Client, GatewayIntentBits, Collection, REST, Routes, Events } = require('discord.js');
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

client.commands = new Collection();

const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));
const commands = [];

for (const folder of commandFolders) {
    const folderPath = path.join(__dirname, 'commands', folder);
    if (fs.statSync(folderPath).isDirectory()) {
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            if (command.data && command.execute) {
                client.commands.set(command.data.name, command);
                commands.push(command.data);
            }
        }
    }
};

client.once('ready', async () => {
    console.log(`Bot is online as ${client.user.tag}`);

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        console.log('Refreshing application (/) commands...');

        await rest.put(
            Routes.applicationGuildCommands(client.user.id, '1270226761447247974'),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    };
});

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
        };
    };

    if (interaction.isButton()) {
        if (interaction.customId === 'button_hello') {
            await interaction.reply('Hello!');
        }
        if (interaction.customId === 'button_goodbye') {
            await interaction.reply('Goodbye!');
        }
    }
});

client.on('guildMemberAdd', (member) => {
    const channel = member.guild.systemChannel;
    if (channel) {
        channel.send(`WELCOME TO THE SERVER ${member.user.username.toUpperCase()}!`);
    }
});
 
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

client.login(process.env.DISCORD_TOKEN);