convert_roles_to_ids.js

Run this script to replace the `id` fields in `config/roles.js` with the actual Discord role IDs from a guild.

Usage:

NODE_ENV=production BOT_TOKEN="<bot token>" GUILD_ID="<guild id>" node scripts/convert_roles_to_ids.js

Notes:
- The script will create a backup at `config/roles.js.bak` before writing.
- It matches roles by name. Ensure role names in `config/roles.js` match the guild exactly.
- Review the backup before committing changes.
- This modifies `config/roles.js` to contain real Discord role IDs; keep a copy of the original if you rely on the numeric config ids.
