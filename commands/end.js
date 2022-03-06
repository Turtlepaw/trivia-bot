const jsh = require("discordjsh");
const { TriviaManager, TriviaGame } = require("../../turtletrivia");
const { CommandInteraction, Client } = require("discord.js");
const ET = require("easy-trivia");

const data = new jsh.commandBuilder()
    .setName("end")
    .setDescription(`Ends the game in the current channel.`);

module.exports = {
    devOnly: true,
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

         if(!interaction.member.permissions.has("MANAGE_MESSAGES")){
             return interaction.reply({
                 content: `Missing Permissions!`
             });
         }
         
         if(!Game){
             return interaction.reply({
                 ephemeral: true,
                 content: `Game Not Found...`
             });
         }

         if(Game.state == "ENDED"){
            return interaction.reply({
                ephemeral: true,
                content: `Game already ended...`
            });
         }

         if(!["IN_PROGRESS", "QUEUE"].includes(Game.state)){
            return interaction.reply({
                ephemeral: true,
                content: `Game is not in progress...`
            });
         }

         Game.end();

        interaction.reply({
            content: `\`✅\` Game Ended!`
        });
    }
}