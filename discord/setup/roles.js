const { createRole } = require('../roles');
const { rolesConfig } = require("../../config")

module.exports = async (guild) => {
    console.log('[Setup] Starting role creation...');

    for (const [category, catData] of Object.entries(rolesConfig)) {
        const { singleChoice, roles } = catData;

        for (const [roleName, roleData] of Object.entries(roles)) {
            try {
                await createRole(guild, {
                    name: roleName, color: roleData.color, permissions: roleData.permissions });
            } catch (error) {
                console.error(`[Setup] Failed to create role ${roleName}:`, error)
            }
        }
    }

    console.log('[Setup] Role creation complete.');
}