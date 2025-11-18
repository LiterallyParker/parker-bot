const path = require('path');
const config = require(path.join('..','config'));

const channelsConfig = config.channelsConfig;
const permissions = config.permissionsConfig;
const rolesConfig = config.rolesConfig;

const errors = [];

// Check permissions channels exist as top-level categories
for (const [roleName, perms] of Object.entries(permissions)) {
    if (!perms) continue;
    const checkList = ['allowedChannels', 'deniedChannels'];
    for (const key of checkList) {
        const arr = perms[key] || [];
        for (const chName of arr) {
            if (!channelsConfig[chName]) {
                errors.push(`${roleName} -> ${key} references non-existent channel category: ${chName}`);
            }
        }
    }
}

// Check verification role category exists and role name exists
if (config.messagesConfig && config.messagesConfig.verification) {
    const v = config.messagesConfig.verification;
    if (!rolesConfig[v.roleCategory]) {
        errors.push(`verification.roleCategory references non-existent role category: ${v.roleCategory}`);
    } else {
        if (!rolesConfig[v.roleCategory].roles[v.roleName]) {
            errors.push(`verification.roleName references non-existent role in category ${v.roleCategory}: ${v.roleName}`);
        }
    }
}

// Check customCategories keys correspond to role categories (optional) - skip

if (errors.length === 0) {
    console.log('No consistency issues found');
    process.exit(0);
} else {
    console.log('Consistency issues:');
    for (const e of errors) console.log('- ' + e);
    process.exit(2);
}
