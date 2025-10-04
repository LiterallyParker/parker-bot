const { createChannel } = require("../channels");
const { channelsConfig } = require("../../../config");

module.exports = async (guild) => {
    console.log('[Setup] Starting channel creation...');

    for (const [categoryName, categoryData] of Object.entries(channelsConfig)) {
        const category = await createChannel(guild, {
            name: categoryName,
            type: 4
        });

        for (const [channelName, channelData] of Object.entries(categoryData.channels)) {
            await createChannel(guild, {
                name: channelName,
                type: channelData.type || 0,
                parent: categoryName,
                topic: channelData.topic || '',
                permissionOverwrites: channelData.permissionOverwrites || [],
                reason: 'Initial Server Setup'
            });
        }
    }

    console.log('[Setup] Channel creation complete.')
}