const jsh = require("discordjsh");
const { TriviaGame } = require("discord-trivia");
const { CommandInteraction, Client } = require("discord.js");
const { Check } = require("../TriviaGamePermissionManager");

const data = new jsh.commandBuilder()
    .setName("end")
    .setDescription(`Ends the game in the current channel.`);

module.exports = {
    data,
    /**
     * Executes the command.
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        /**
         * @type {TriviaGame}
         */
        const Game = client.TriviaGames.get(interaction.channel.id);

        if (!Game) {
            return interaction.reply({
                ephemeral: true,
                content: `❌ Game Not Found...`
            });
        }

        if (Game.state == "ended") {
            return interaction.reply({
                ephemeral: true,
                content: `❌ Game already ended...`
            });
        }

        if (Game.state == "pending") {
            return interaction.reply({
                ephemeral: true,
                content: `❌ Game is pending...`
            });
        }
        
        if (!Check(Game, interaction?.member)) {
            return interaction.reply({
                content: `❌ Missing Permissions!`
            });
        }

        Game.end();

        await interaction.reply({
            content: `**⏱️ Game Ended!**`
        });
    }
}