const { createRole } = require('../roles');
const { rolesConfig } = require("../../../config")

const { colorize } = require('../../util/colors');

module.exports = async (guild) => {
    // Step 1: Role Creation
    for (const [category, catData] of Object.entries(rolesConfig)) {
        const { roles } = catData;

        for (const [roleName, roleData] of Object.entries(roles)) {
            try {
                await createRole(guild, { name: roleName, color: roleData.color, permissions: roleData.permissions });
                console.log(colorize(`(1) Created role: ${roleName}`, 'green'));
            } catch (error) {
                console.error(colorize(`(1) Failed to create role ${roleName}:`, 'red'), error);
            }
        }
    }

    console.log(colorize('(1) Role creation finished.', 'cyan'));
};