const jsh = require("discordjsh");
const { TriviaManager, TriviaCommandBuilder } = require("../../turtletrivia");
const { CommandInteraction, Client, MessageEmbed, MessageButton } = require("discord.js");
const ET = require("easy-trivia");
const { BotHasPermissions } = require("../TriviaGamePermissionManager");

function addStringOption(builder, name, description, req = false, vals) {
    builder.addStringOption(e => {
        e.setName(name)
            .setDescription(description)
            .setRequired(req)
        if (vals != null) e.addChoices(vals);
        return e;
    });
}

const data = new TriviaCommandBuilder();

module.exports = {
    data,
    /**
     * Executes the command.
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(BotHasPermissions(interaction.guild.me, interaction.channel).status == false){
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`It looks like I don't have the correct permissions in this channel!`)
                    .setTitle(`👀 Invalid Bot Permissions`)
                    .setColor("BLURPLE")
                ],
                components: [
                    {
                        type: 1,
                        components: [
                            new MessageButton()
                            .setCustomId(`INVALID_PERMISSIONS`)
                            .setLabel(`Fix Permissions`)
                            .setStyle("DANGER")
                        ]
                    }
                ]
            });
        }

        const trivia = new TriviaManager();
        const maxPlayerCount = interaction.options.getString("max_players");
        const minPlayerCount = interaction.options.getString("min_players");
        const questionAmount = interaction.options.getString("amount");
        const questionType = interaction.options.getString("type");
        const questionDifficulty = interaction.options.getString("difficulty");
        const triviaCategory = interaction.options.getString("category");

        const game = trivia.createGame(interaction, {
            maxPlayerCount: maxPlayerCount || 50,
            minPlayerCount: minPlayerCount || 1,
            questionAmount: questionAmount || 10,
            questionType: questionType || "multiple",
            questionDifficulty: questionDifficulty || "easy",
            triviaCategory
        });

        client.TriviaGames.set(interaction.channel.id, game);

        try {
            await game.start();
        } catch (err) {
            console.error(err);
            await interaction.followUp(`**<:error:950543140031430708> Error!**\n\n\`\`\`${err}\`\`\``);
        }
    }
}
