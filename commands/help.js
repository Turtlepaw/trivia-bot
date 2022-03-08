const jsh = require("discordjsh");
const { TriviaManager } = require("../../turtletrivia");
const { CommandInteraction, Client, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ET = require("easy-trivia");
const { URL } = require("../config");
const { BotHasPermissions } = require("../TriviaGamePermissionManager");
const SupportURL = "https://discord.gg/UYyyVbAAZb";
const GithubURL = "https://github.com/Turtlepaw/trivia-bot";

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
        const Rows = [
            new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel(`Add to Server`)
                        .setURL(client.Invite)
                        .setStyle("LINK"),
                    new MessageButton()
                        .setLabel(`Learn More`)
                        .setURL(URL)
                        .setStyle("LINK"),
                    new MessageButton()
                        .setLabel(`Discord`)
                        .setURL(SupportURL)
                        .setStyle("LINK"),
                    new MessageButton()
                        .setLabel(`Github`)
                        .setURL(GithubURL)
                        .setStyle("LINK")
                )
        ];
        
        if(!BotHasPermissions(interaction.guild.me, interaction.channel).status){
            Rows.push(
                {
                    type: 1,
                    components: [
                        new MessageButton()
                        .setCustomId(`INVALID_PERMISSIONS`)
                        .setLabel(`Fix Permissions`)
                        .setStyle("DANGER")
                    ]
                }
            );
        }

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setAuthor({
                        name: `Discord Trivia (Bot)`,
                        iconURL: client.user.displayAvatarURL(),
                        url: URL
                    })
                    .setDescription(`This is a demonstration of [Discord Trivia](${URL}). Discord Trivia is a powerful (NPM) module that allows your bot to create trivia games!`)
                    .addField(`🕹️ Creating a Game`, `First enter \`/trivia\` in the chatbox and select \`/trivia\` from ${client.user} you can enter trivia options in the options text box's. Then your game should begin!`)
                    .addField(`⏱️ Ending a Game`, `To end a game use the command \`/end\` on the trivia game's channel.`)
                    .addField(`👀 More About Discord Trivia`, `Discord Trivia is currently under construction and in the testing phase! You can watch the status on the [github](${URL}) or you can join the [support server](${SupportURL}) to check the status.`)
                    .setFooter({
                        text: `Powered by Discord Trivia`,
                        iconURL: `https://cdn.discordapp.com/attachments/947636249856999424/947636392673038336/icon.png`
                    })
            ],
            components: Rows
        });
    }
}