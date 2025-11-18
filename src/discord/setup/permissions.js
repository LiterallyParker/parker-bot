const { permissionsConfig } = require("../../../config");

module.exports = async (guild) => {
    // Step 3: Permission Assignment
    const { fetchRole } = require('../roles');

    for (const [roleName, perms] of Object.entries(permissionsConfig)) {
        const role = await fetchRole(guild, roleName);
        if (!role) {
            console.warn(`Role "${roleName}" not found, skipping.`);
            continue;
        }

        for (const channelName of perms.allowedChannels) {
            const channel = guild.channels.cache.find(ch => ch.name === channelName);
            if (!channel) continue;

            await channel.permissionOverwrites.edit(role, { ViewChannel: true, SendMessages: true });
            console.log(`Allowed ${roleName} -> ${channelName}`);
        }

        for (const channelName of perms.deniedChannels) {
            const channel = guild.channels.cache.find(ch => ch.name === channelName);
            if (!channel) continue;

            await channel.permissionOverwrites.edit(role, { ViewChannel: false });
            console.log(`Denied ${roleName} -> ${channelName}`);
        }
    }

};