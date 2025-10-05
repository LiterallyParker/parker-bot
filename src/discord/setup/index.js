module.exports = async (guild) => {
    const runIfFunction = async (modPath, label) => {
        try {
            const mod = require(modPath);
            if (typeof mod === 'function') {
                await mod(guild);
            } else {
                console.warn(`[Setup] ${label} module does not export a function, skipping.`);
            }
        } catch (e) {
            console.error(`${label} setup failed:`, e);
        }
    };

    await runIfFunction('./roles', 'Roles');
    await runIfFunction('./channels', 'Channels');
    await runIfFunction('./permissions', 'Permissions');
    await runIfFunction('./messages', 'Messages');
};