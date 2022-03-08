const { Collection, MessageEmbed, MessageButton } = require("discord.js");
const jsh = require("discordjsh");
const { clientId, token } = require("./config.json");

const BuilderClient = new jsh.Client({
    token,
    clientID: clientId,
    testGuildID: "842575277249921074"
}).setCommandsDir();

const client = BuilderClient.create({
    intents: "GUILDS",
    partials: ["CHANNEL", "GUILD_MEMBER", "USER"]
});

client.TriviaGames = new Collection();
client.Invite = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&scope=applications.commands+bot&permissions=51200`;

client.on("interactionCreate", async btn => {
    if(!btn.isButton() || btn.customId != "INVALID_PERMISSIONS") return;

    await btn.reply({
        embeds: [
            new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`Fixing Bot Permissions`)
            .setDescription(`Hey there! It looks like I don't have the right permissions to function properly... To fix this edit my permissions in this chanel and allow:\n\n• \`SEND_MESSAGES\`\n• \`ATTACH_FILES\`\n• \`EMBED_LINKS\`\n\nOr you can invite me with the link below to fix my role permissions! (Note that this may not fix my permissions in this channel!)`)
        ],
        components: [
            {
                type: 1,
                components: [
                    new MessageButton()
                    .setLabel(`Fix Permissions`)
                    .setStyle("LINK")
                    .setURL(client.Invite)
                ]
            }
        ],
        ephemeral: true
    })
})