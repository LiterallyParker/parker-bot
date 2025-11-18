require('dotenv').config();
const { client, loadCommands, loadEvents, handleShutdown } = require('./src/bootstrap');

if (!process.env.DISCORD_TOKEN) {
    console.error('Error: DISCORD_TOKEN is not set in environment variables.');
    process.exit(1);
}

loadCommands(client);
loadEvents(client);
handleShutdown(client);

client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.error('Failed to login:', err);
    process.exit(1);
});