const jsh = require("discordjsh");
const { TriviaManager } = require("../../turtletrivia");
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

const data = new jsh.commandBuilder()
    .setName("trivia")
    .setDescription(`Creates a trivia game!`);

//Types
addStringOption(data, "type", "The type of questions.", false, [
    ["True or false", "boolean"],
    ["A, B, C, or D", "multiple"]
]);
addStringOption(data, "difficulty", "The difficulty of the game/questions.", false, [
    ["Easy", "easy"],
    ["Medium", "medium"],
    ["Hard", "hard"]
]);
addStringOption(data, "category", "The game/questions category.", false, [
    ["General Knowledge", "GENERAL_KNOWLEDGE"],
    ["Books", "ENTERTAINMENT_BOOKS"],
    ["Film", "ENTERTAINMENT_FILM"],
    ["Music", "ENTERTAINMENT_MUSIC"],
    ["Musicals & Theatres", "ENTERTAINMENT_MUSICALS_AND_THEATRES"],
    ["Television", "ENTERTAINMENT_TELEVISION"],
    ["Video Games", "ENTERTAINMENT_VIDEO_GAMES"],
    ["Board Games", "ENTERTAINMENT_BOARD_GAMES"],
    ["Science & Nature", "SCIENCE_AND_NATURE"],
    ["Computers", "SCIENCE_COMPUTERS"],
    ["Math", "SCIENCE_MATHEMATICS"],
    ["Mythology", "MYTHOLOGY"],
    ["Sports", "SPORTS"],
    ["Geography", "GEOGRAPHY"],
    ["History", "HISTORY"],
    ["Politics", "POLITICS"],
    ["Art", "ART"],
    ["Celebrities", "CELEBRITIES"],
    ["Animals", "ANIMALS"],
    ["Vehicles", "VEHICLES"],
    ["Comics", "ENTERTAINMENT_COMICS"],
    ["Gadgets", "SCIENCE_GADGETS"],
    ["Anime & Manga", "ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA"],
    ["Cartoon & Animations", "ENTERTAINMENT_CARTOON_AND_ANIMATIONS"]
]);

//Amounts
addStringOption(data, "amount", "The amount of questions.");

//Max/mins
addStringOption(data, "max_players", "The max amount of players allowed to join the game.");
addStringOption(data, "min_players", "The mix amount of players needed to start the game.");

module.exports = {
    data,
    /**
     * Executes the command.
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(BotHasPermissions(interaction.guild.me, interaction.channel).status){
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
            await interaction.reply(`**<:error:950543140031430708> Error!**\n\n\`\`\`${err}\`\`\``);
        }
    }
}
