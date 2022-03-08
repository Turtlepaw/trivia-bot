const { Collection } = require("discord.js");
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
client.Invite = "https://discord.com/api/oauth2/authorize?client_id=950242907489714217&scope=applications.commands+bot&permissions=51200";