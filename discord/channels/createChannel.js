module.exports = async (guild, {
    name,
    type = 0, // 0 = GUILD_TEXT, 2 = GUILD_VOICE, 4 = GUILD_CATEGORY
    parent = null,
    topic = '',
    permissionOverwrites = [],
    reason
}) => {
    let parentCategory = null;

    // If a parent category is specified, ensure it exists or create it
    if (parent) {
        parentCategory = guild.channels.cache.find(
            ch => ch.name.toLowerCase() === parent.toLowerCase() && ch.type === 4
        );

        if (!parentCategory) {
            parentCategory = await guild.channels.create({
                name: parent,
                type: 4,
                reason: `Creating parent category for ${name}`,
            });
        }
    }

    // Check if the channel already exists
    const existingChannel = guild.channels.cache.find(ch => ch.name === name && ch.type === type);
    if (existingChannel) {
        if (parentCategory && existingChannel.parentId !== parentCategory.id) {
            await existingChannel.setParent(parentCategory.id, { lockPermissions: false });
            console.log(`Moved existing channel #${name} to category ${parentCategory.name}`);
        }
        return existingChannel;
    };

    // Create the channel
    try {
        const channel = await guild.channels.create({
            name,
            type,
            parent: parentCategory ? parentCategory.id : null,
            topic,
            permissionOverwrites,
            reason,
        });

        console.log(`[Setup] Created channel: #${name}`);
        return channel;
    } catch (error) {
        console.error(`[Setup] Failed to create channel "${name}":`, error);
        throw error;
    }
};