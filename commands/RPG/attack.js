const { Stats } = require("../../models");

module.exports = {
    name: "attack",
    description: "Attacks a mentioned user's HP.",
    async execute(message) {
        const attacker = message.author;
        const defender = message.mentions.users.first();

        if (!defender) {
            return message.reply("You have to attack someone?\nCome on now");
        };

        try {
            const attackerStats = await Stats.findOne({ where: { discordId: attacker.id } });
            const defenderStats = await Stats.findOne({ where: { discordId: defender.id } });

            if (!attackerStats) return message.reply("You are not registered to the game. Use !register to register.");
            if (!defenderStats) return message.reply(`${defender.username} is not registered to the game.`);

            const now = new Date();
            const lastAttackTime = attackerStats.LAST_ATT ? new Date(attackerStats.LAST_ATT) : null;
            const oneHour = 60 * 60 * 1000;

            if (lastAttackTime && now - lastAttackTime >= oneHour) {
                await attackerStats.update({ ATT_USED: 0 });
            }

            if (attackerStats.ATT_USED >= 3) {
                return message.reply("You can only attack three times in an hour.\nI don't make the rules, just enforce them :)");
            };

            const roll = Math.random();
            let attackType, attackMultiplier;

            if (roll < 0.25) {
                attackType = "It was a miss...";
                attackMultiplier = 0;
            } else if (roll < 0.5) {
                attackType = "It was a weak hit.";
                attackMultiplier = 0.5;
            } else if (roll < 0.9) {
                attackType = "A solid hit!";
                attackMultiplier = 1;
            } else {
                attackType = "A critical hit!!!";
                attackMultiplier = 1.25;
            };

            const attackPower = Math.round(attackerStats.ATT * attackMultiplier);
            const damage = Math.max(attackPower - defenderStats.DEF, 1);
            const newHP = Math.max(defenderStats.HP - damage, 0);

            await defenderStats.update({ HP: newHP });
            await attackerStats.update({ ATT_USED: attackerStats.ATT_USED + 1 });
            await attackerStats.update({ LAST_ATT: new Date() });

            message.channel.send(
                `__**<@${attacker.id}>**__ attacked __**<@${defender.id}>**__!\n\n` +
                `${attackType}\n\n` +
                `__**<@${attacker.id}>**__ attacks for  ->  **${attackPower}**\n\n` +
                `__**<@${defender.id}>**__ absorbed  ->  **${defenderStats.DEF}**\n\n` +
                `__**<@${defender.id}>'s**__ HP  ->  **${newHP}/${defenderStats.MAX_HP}**\n\n` +
                `__**<@${attacker.id}>'s**__ remaining attacks  ->  **${3 - attackerStats.ATT_USED}**`
            )
        } catch (error) {
            console.log("Error handling attack command:", error);
            message.reply("Error attacking user. Not my fault, I swear.");
        }
    }
};