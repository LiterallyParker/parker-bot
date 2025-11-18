const { createChannel } = require("../channels");
const { channelsConfig } = require("../../../config");

module.exports = async (guild) => {
    // Step 2: Channel Creation
    for (const [categoryName, categoryData] of Object.entries(channelsConfig)) {
        await createChannel(guild, { name: categoryName, type: 4 });
        console.log(`Ensured category: ${categoryName}`);

        for (const [channelName, channelData] of Object.entries(categoryData.channels)) {
            // Process permission overwrites to resolve @everyone to guild ID
            const permissionOverwrites = (channelData.permissionOverwrites || []).map(overwrite => {
                if (overwrite.id === '@everyone') {
                    return { ...overwrite, id: guild.id };
                }
                return overwrite;
            });

            await createChannel(guild, {
                name: channelName,
                type: channelData.type || 0,
                parent: categoryName,
                topic: channelData.topic || '',
                permissionOverwrites,
                reason: 'Initial Server Setup'
            });
            console.log(`Ensured channel: ${channelName} (parent: ${categoryName})`);
        }
    }

};