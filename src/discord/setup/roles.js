const { createRole } = require('../roles');
const { rolesConfig } = require("../../../config")

module.exports = async (guild) => {
    // Step 1: Role Creation
    for (const [category, catData] of Object.entries(rolesConfig)) {
        const { roles } = catData;

        for (const [roleName, roleData] of Object.entries(roles)) {
            try {
                await createRole(guild, { name: roleName, color: roleData.color, permissions: roleData.permissions });
                console.log(`Created role: ${roleName}`);
            } catch (error) {
                console.error(`Failed to create role ${roleName}:`, error);
            }
        }
    }
};