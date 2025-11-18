const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('goodbye')
        .setDescription('Does the basic bot goodbye.'),
    async execute(interaction) {
        const farewells = [
            "Goodbye!", "See you later!", "Farewell!", "Take care!", "Bye-bye!", 
            "Adios!", "Ciao!", "Au revoir!", "Sayonara!", "Auf Wiedersehen!", 
            "See you next time!", "Catch you later!", "So long!", "Toodles!", "Later, alligator!", 
            "Peace out!", "Smell ya later!", "Stay safe!", "Until next time!", "Have a great day!", 
            "Bon voyage!", "Cheerio!", "Godspeed!", "Parting is such sweet sorrow!", "See ya!", 
            "Be well!", "Keep in touch!", "Stay awesome!", "May we meet again!", "Don't be a stranger!", "I will not miss you."
        ];

        const randomFarewell = farewells[Math.floor(Math.random() * farewells.length)];
        interaction.reply(randomFarewell);
    }
};