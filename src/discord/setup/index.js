const { colorize } = require('../../util/colors');

module.exports = async (guild) => {
    // Helper to run a setup step with nice console framing
    const runStep = async (modPath, label, stepNumber) => {
    const header = `\n===== [SETUP] (${stepNumber}) ${label} - START =====`;
    const footer = `===== [SETUP] (${stepNumber}) ${label} - COMPLETE =====\n`;
    console.log(colorize(header, 'cyan'));
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
    console.log(colorize(footer, 'green'));
    };

    // Run setup steps with explicit ordering and nicely framed logs
    await runStep('./roles', 'Role Creation', 1);
    await runStep('./channels', 'Channel Creation', 2);
    await runStep('./permissions', 'Permission Assignment', 3);
    await runStep('./messages', 'Messages Setup', 4);
};