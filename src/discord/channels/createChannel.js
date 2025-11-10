/*
* Create a Discord Channel
* Options:
* - name: Name of the channel
* - type: Type of the channel (0 = GUILD_TEXT, 2 = GUILD_VOICE, 4 = GUILD_CATEGORY)
* - parent: (optional) Name of the parent category
* - topic: (optional) Topic for text channels
* - permissionOverwrites: (optional) Array of permission overwrite objects
* - reason: (optional) Reason for audit logs
*/

module.exports = async (guild, options = {
    name: 'new-channel',
    type: 0, // 0 = GUILD_TEXT, 2 = GUILD_VOICE, 4 = GUILD_CATEGORY
    parent: null,
    topic: null,
    permissionOverwrites: [],
    reason: 'Channel created by discord/channels/createChannel.js',
}) => {
    let parentCategory = null;

    // If a parent category is specified, ensure it exists or create it
    if (options.parent) {
        parentCategory = guild.channels.cache.find(
            ch => ch.name.toLowerCase() === options.parent.toLowerCase() && ch.type === 4
        );

        if (!parentCategory) {
            parentCategory = await guild.channels.create({
                name: options.parent,
                type: 4,
                reason: `Creating parent category for ${options.name}`,
            });
        }
    }

    // Check if the channel already exists
    const existingChannel = guild.channels.cache.find(ch => ch.name === options.name && ch.type === options.type);
    if (existingChannel) {
        if (parentCategory && existingChannel.parentId !== parentCategory.id) {
            await existingChannel.setParent(parentCategory.id, { lockPermissions: false });
            console.log(`Moved existing channel #${options.name} to category ${parentCategory.name}`);
        }
        return existingChannel;
    };

    // Create the channel
    try {
        const channel = await guild.channels.create({
            name: options.name,
            type: options.type,
            parent: parentCategory ? parentCategory.id : null,
            topic: options.topic,
            permissionOverwrites: options.permissionOverwrites,
            reason: options.reason,
        });
        return channel;
    } catch (error) {
        console.error(`Failed to create channel "${options.name}":`, error);
        throw error;
    };
};