<!-- scope: parker-bot app -->
This is an app-scoped Copilot instructions file for `apps/parker-bot/` only.

Quick scope
- Scope: parker-bot (Discord bot). Agents should prefer the app-local guidance over repo-root rules for code inside `apps/parker-bot/`.

Run & deploy
- Dev run: from `apps/parker-bot/` run `npm run dev` (nodemon) or `npm start`.
- Deploy slash commands (guild-scoped): `npm run deploy` or `node deploy-commands.js` (requires `CLIENT_ID`, `GUILD_ID`, `DISCORD_TOKEN`).

Environment
- Required env vars:
  - `DISCORD_TOKEN` — bot token; required to run.
  - `CLIENT_ID`, `GUILD_ID` — required to register guild-scoped slash commands.
  - `ELEVENLABS_API_KEY` — optional but required for TTS features in `src/elevenlabs/`.

Code contracts (must follow these exactly)
- Command modules (`src/commands/**`) must export:
  - `data` — SlashCommandBuilder instance (or serializable object with `.toJSON()`)
  - `execute(interaction)` — async function handling the interaction.
  Example: see `src/commands/chat/hello.js`.
- Event modules (`src/events/**`) must export an object: `{ name, once?, execute(...) }` and should accept `(args..., client)` when registered.

Patterns & gotchas
- Commands are loaded recursively by `src/bootstrap/loadCommands.js`. Invalid modules (missing `data` or `execute`) are skipped with a console warning.
- `deploy-commands.js` registers commands to a guild for fast iteration. Prefer guild-scoped commands during development. To make a command global, change the route to `Routes.applicationCommands(process.env.CLIENT_ID)` but expect propagation delays.
- When replying to interactions, check `interaction.replied` before `reply()` to avoid errors (see `src/events/interaction/interactionCreate.js`).

Integration example: ElevenLabs TTS (minimal)
const { createClient } = require('../src/elevenlabs/client');
const client = createClient(); // throws if ELEVENLABS_API_KEY missing

// Use `client` per the ElevenLabs SDK to synthesize audio; store or stream to voice channel.

Files to inspect quickly
- `index.js`, `src/bootstrap/*`, `src/commands/**`, `src/events/**`, `deploy-commands.js`, `src/discord/setup/**`, `src/elevenlabs/*`.

Security note
- Never add secrets to source. Use local `.env` or GitHub secrets for CI. Do not print secrets in PR descriptions or code comments.

If you want this expanded
- I can add a concrete ElevenLabs usage example taken from `src/commands/voice/speak.js` and a small reaction-role walkthrough from `src/discord/reactions` if you want more.  
