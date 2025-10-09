const { permissionsConfig } = require("../../../config");

const { colorize } = require('../../util/colors');

module.exports = async (guild) => {
    // Step 3: Permission Assignment
    const { fetchRole } = require('../roles');

    for (const [roleName, perms] of Object.entries(permissionsConfig)) {
        const role = await fetchRole(guild, roleName);
        if (!role) {
            console.warn(`(3) Role "${roleName}" not found, skipping.`);
            continue;
        }

        for (const channelName of perms.allowedChannels) {
            const channel = guild.channels.cache.find(ch => ch.name === channelName);
            if (!channel) continue;

            await channel.permissionOverwrites.edit(role, { ViewChannel: true, SendMessages: true });
            console.log(colorize(`(3) Allowed ${roleName} -> ${channelName}`, 'green'));
        }

        for (const channelName of perms.deniedChannels) {
            const channel = guild.channels.cache.find(ch => ch.name === channelName);
            if (!channel) continue;

            await channel.permissionOverwrites.edit(role, { ViewChannel: false });
            console.log(colorize(`(3) Denied ${roleName} -> ${channelName}`, 'yellow'));
        }

        console.log(colorize(`(3) Permissions applied for role ${roleName}`, 'cyan'));
    }

    console.log(colorize('(3) Permission assignment finished.', 'cyan'));
};