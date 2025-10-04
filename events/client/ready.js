const { Events } = require('discord.js');
const setupServer = require('../../discord/setup');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Bot is online as ${client.user.tag}`);

        const guild = client.guilds.cache.get(process.env.GUILD_ID);
        if (!guild) {
            console.error('Guild not found! Make sure GUILD_ID is set.');
            return;
        }

        try {
            await setupServer(guild);
            console.log('[Setup] Setup complete.')
        } catch (error) {
            console.error(`[Setup] Failed to setup the server:`, error)
        }
    }
};