const { permissionsConfig } = require("../../../config");

module.exports = async (guild) => {
    console.log("[Setup] Starting permission assignment...");

    for (const [roleName, perms] of Object.entries(permissionsConfig)) {
        const role = guild.roles.cache.find(r => r.name === roleName);
        if (!role) {
            console.warn(`[Setup] Role "${roleName}" not found, skipping.`);
            continue;
        }

        for (const channelName of perms.allowedChannels) {
            const channel = guild.channels.cache.find(ch => ch.name === channelName);
            if (!channel) continue;

            await channel.permissionOverwrites.edit(role, {
                ViewChannel: true,
                SendMessages: true
            });
        }

        for (const channelName of perms.deniedChannels) {
            const channel = guild.channels.cache.find(ch => ch.name === channelName);
            if (!channel) continue;

            await channel.permissionOverwrites.edit(role, {
                ViewChannel: false
            });
        }

        console.log(`[Setup] Permissions applied for role ${roleName}`);
    }

    console.log('[Setup] Permissions assignment complete.')
}