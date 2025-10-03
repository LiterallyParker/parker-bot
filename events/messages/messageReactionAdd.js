const { Events } = require('discord.js');
const { reactionRoles } = require('../../config');

async function fetchMember(reaction, user) {
    const guild = reaction.message.guild;
    return await guild.members.fetch(user.id);
};

async function fetchRole(guild, roleName) {
    return guild.roles.cache.find(r => r.name === roleName) || null;
};

async function removeOtherReactions(fullMessage, cat, emoji, user) {
    for (const otherEmoji of Object.keys(cat.emojis)) {
        if (otherEmoji === emoji) continue;

        const otherReaction = fullMessage.reactions.resolve(otherEmoji);
        if (otherReaction) {
            try {
                await otherReaction.users.remove(user.id);
            } catch (error) {
                console.error(error);
            }
        }
    }
};

async function removeOtherRoles(member, guild, cat, emoji) {
    for (const otherEmoji of Object.keys(cat.emojis)) {
        if (otherEmoji === emoji) continue;

        const otherRoleName = cat.emojis[otherEmoji];
        const otherRole = guild.roles.cache.find(r => r.name === otherRoleName);
        if (otherRole && member.roles.cache.has(otherRole.id)) {
            try {
                await member.roles.remove(otherRole);
            } catch (error) {
                console.error(error);
            }
        }
    }
};

async function handleSingleChoice(reaction, user, cat, emoji, member) {
    const fullMessage = await reaction.message.fetch();
    await removeOtherReactions(fullMessage, cat, emoji, user);
    await removeOtherRoles(member, reaction.message.guild, cat, emoji);
};

async function assignRole(member, role) {
    if (role && !member.roles.cache.has(role.id)) {
        try {
            await member.roles.add(role);
        } catch (error) {
            console.error(error);
        }
    };
};


module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user) {
        if (user.bot) return;

        // Fetch partials
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        // Check if the reaction is in the reactionRoles mapping
        const emoji = reaction.emoji.name;
        const guild = reaction.message.guild;
        const member = await fetchMember(reaction, user);

        for (const cat of Object.values(reactionRoles)) {
            if (reaction.message.id !== cat.messageId) continue;

            const roleName = cat.emojis[emoji];
            if (!roleName) continue;

            const role = await fetchRole(guild, roleName);

            if (cat.singleChoice) {
                await handleSingleChoice(reaction, user, cat, emoji, member);
            };

            await assignRole(member, role);
            console.log(`Assigned role ${roleName} to ${user.tag}`);
        }
    }
};