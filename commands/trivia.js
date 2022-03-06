const jsh = require("discordjsh");
const { TriviaManager } = require("../../turtletrivia");
const { CommandInteraction, Client } = require("discord.js");
const ET = require("easy-trivia");

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
    devOnly: true,
    data,
    /**
     * Executes the command.
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const trivia = new TriviaManager();
        const {
            maxPlayerCount,
            minPlayerCount,
            questionAmount,
            questionType,
            questionDifficulty,
            triviaCategory
        } = ["maxPlayerCount", "minPlayerCount", "questionAmount", "questionType", "questionDifficulty", "triviaCategory"]
            .map(e => {
                return interaction.options.getString(e) || null;
            });

        const game = trivia.createGame(interaction, {
            maxPlayerCount: maxPlayerCount || 50,
            minPlayerCount: minPlayerCount || 1,
            questionAmount: questionAmount || 10,
            questionType: "multiple",
            questionDifficulty: questionDifficulty || "easy",
            triviaCategory
        });

        try {
            await game.start();
        } catch (err) {
            console.error(err);
            await interaction.reply(`**⚠️ Error!**\n\n\`\`\`${err}\`\`\``);
        }
    }
}