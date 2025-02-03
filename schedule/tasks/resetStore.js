const store = require("../../classes/store");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

async function resetStore() {
    await store.loadStore();

    const channelId = "1334596401186865224";
    const channel = await client.channels.fetch(channelId);

    if (channel) {
        channel.send("Store has been reset! use !store to see what's new.");
    } else {
        console.error("Failed to fetch store channel.");
    };
};

client.login(process.env.DISCORD_TOKEN);
module.exports = resetStore;