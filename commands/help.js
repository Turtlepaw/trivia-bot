const jsh = require("discordjsh");
const { TriviaManager } = require("../../turtletrivia");
const { CommandInteraction, Client, MessageEmbed, MessageButton } = require("discord.js");
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
                .setAuthor({
                    name: `Discord Trivia (Bot)`,
                    iconURL: `https://cdn.discordapp.com/emojis/950517360299741285.webp?size=44&quality=lossless`
                })
                .addField(`<:new:950517418332143698> Creating a game`, `First enter \`/trivia\` in the chatbox and select \`/trivia\` from ${client.user} you can enter trivia options in the options text box's. Then your game should begin!`)
                .addField(`<:timer:935695303359725568> Ending a game`, `To end a game use the command \`/end\` on the trivia game's channel.`)
                //.addField(`📜 Defualt Options`, `Max Players: 50\nMin Players: 1\nType: \`MULTIPLE\`\nDifficulty: \`EASY\`\nAmount: 10\nCategory: 🎲 Random`)
            ],
            components: [
                {
                    type: 1,
                    components: [
                        new MessageButton()
                        .setLabel(`Add to Server`)
                        .setURL(client.Invite)
                        .setStyle("LINK"),
                        new MessageButton()
                        .setLabel(`Learn More`)
                        .setURL(`https://github.com/Elitezen/discord-trivia/`)
                        .setStyle("LINK")
                    ]
                }
            ]
        });
    }
}