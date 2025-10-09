const { createChannel } = require("../channels");
const { channelsConfig } = require("../../../config");

const { colorize } = require('../../util/colors');

module.exports = async (guild) => {
    // Step 2: Channel Creation
    for (const [categoryName, categoryData] of Object.entries(channelsConfig)) {
        const category = await createChannel(guild, { name: categoryName, type: 4 });
        console.log(colorize(`(2) Ensured category: ${categoryName}`, 'green'));

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
            console.log(colorize(`(2) Created/Ensured channel: ${channelName} (parent: ${categoryName})`, 'green'));
        }
    }

    console.log(colorize('(2) Channel creation finished.', 'cyan'));
};