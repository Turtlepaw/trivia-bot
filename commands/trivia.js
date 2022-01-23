const jsh = require("discordjsh");
const { TriviaManager } = require("../../discord-trivia");
const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    devOnly: true,
    data: new jsh.commandBuilder()
        .setName("trivia")
        .setDescription(`Creates a trivia game!`),
    /**
     * Executes the command.
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const trivia = new TriviaManager();
        const game = trivia.createGame(interaction);

        try {
            await game.start();
        } catch (err) {
            console.error(err);
        }
    }
}