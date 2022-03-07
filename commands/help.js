const jsh = require("discordjsh");
const { TriviaManager } = require("../../turtletrivia");
const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
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
    .setName("help")
    .setDescription(`Learn how to use Discord Trivia bot.`);

module.exports = {
    data,
    /**
     * Executes the command.
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor("BLURPLE")
                .setTitle(`❓ Discord Trivia (Bot)`)
                .addField(`👀 Creating a game`, `First enter \`/trivia\` in the chatbox and select \`/trivia\` from ${client.user} you can enter trivia options in the options text box's. Then your game should begin!`)
                //.addField(`📜 Defualt Options`, `Max Players: 50\nMin Players: 1\nType: \`MULTIPLE\`\nDifficulty: \`EASY\`\nAmount: 10\nCategory: 🎲 Random`)
            ]
        })
    }
}