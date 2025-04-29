const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Does the basic bot greeting.'),
    async execute(interaction) {
        const greetings = [
            "Hello!", "Hi!", "Hey!", "Greetings!", "Salutations!", 
            "Howdy!", "Yo!", "What's up?", "Good day!", "Bonjour!", 
            "Hola!", "Ciao!", "Hallo!", "Olá!", "Namaste!", 
            "Salam!", "Konnichiwa!", "Annyeong!", "Zdravstvuyte!", "Shalom!", 
            "Sawubona!", "Merhaba!", "Yassas!", "Hej!", "Hei!", 
            "Hallå!", "Aloha!", "Ahoy!", "Szia!", "Mabuhay!", "Existance is pain."
          ];

        const randGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        interaction.reply(randGreeting);
    }
};