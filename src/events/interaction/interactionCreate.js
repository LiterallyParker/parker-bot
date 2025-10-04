const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (!interaction.replied) {
                    await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
                }
                await interaction.followUp({ content: 'There was an error executing this command.', ephemeral: true });
            };
        };

        if (interaction.isButton()) {
            if (interaction.customId === 'button_hello') {
                await interaction.reply('Hello!');
            }
            if (interaction.customId === 'button_goodbye') {
                await interaction.reply('Goodbye!');
            }
        }
    }
};