/*
Script: convert_roles_to_ids.js
Usage:
  NODE_ENV=production BOT_TOKEN="<bot token>" GUILD_ID="<guild id>" node scripts/convert_roles_to_ids.js

What it does:
- Loads config/roles.js
- For each role name in each category, finds the Discord role in the specified guild by name
- Replaces the `id` field in config/roles.js with the discovered Discord role.id
- Creates a backup file config/roles.js.bak before writing

IMPORTANT: Run this while the bot user can see the target guild. Review the backup before committing.
*/

const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

const BOT_TOKEN = process.env.BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;

if (!BOT_TOKEN || !GUILD_ID) {
    console.error('Please set BOT_TOKEN and GUILD_ID env vars');
    process.exit(1);
}

const rolesPath = path.resolve(__dirname, '..', 'config', 'roles.js');
const backupPath = `${rolesPath}.bak`;

(async () => {
    // Load roles config
    let rolesConfig = require(rolesPath);

    // Start Discord client
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
    await client.login(BOT_TOKEN);
    const guild = await client.guilds.fetch(GUILD_ID);
    if (!guild) {
        console.error('Guild not found');
        process.exit(1);
    }

    // Deep copy the config for modification
    const newConfig = JSON.parse(JSON.stringify(rolesConfig));

    for (const [catKey, cat] of Object.entries(newConfig)) {
        for (const [roleName, meta] of Object.entries(cat.roles)) {
            try {
                const role = guild.roles.cache.find(r => r.name === roleName);
                if (!role) {
                    console.warn(`Role not found in guild: ${roleName} (category ${catKey})`);
                    continue;
                }
                console.log(`Mapping ${roleName} -> ${role.id}`);
                meta.id = role.id;
            } catch (err) {
                console.error('Error resolving role:', roleName, err);
            }
        }
    }

    // Backup original
    fs.copyFileSync(rolesPath, backupPath);
    // Serialize to file (preserve require format)
    const out = 'const { Colors } = require(\'discord.js\')\n\nmodule.exports = ' + JSON.stringify(newConfig, null, 4) + '\n';
    fs.writeFileSync(rolesPath, out, 'utf8');

    console.log('Wrote updated roles config. Backup created at', backupPath);
    await client.destroy();
})();
