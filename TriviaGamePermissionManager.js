const { GuildMember, Client, Permissions, GuildChannel } = require("discord.js");
const { TriviaGame } = require("../turtletrivia");

/**
 * 
 * @param {TriviaGame} game 
 * @param {GuildMember} member 
 */
module.exports.Check = (game, member) => {
    if(game.hostMember.id == member.id){
        return true;
    } else if(member.permissions.has(this.GetDefualtMemberPermissions())){
        return true
    } else {
        return false;
    }
}

module.exports.GetDefualtMemberPermissions = () => [
    "MANAGE_CHANNELS",
    "MANAGE_MESSAGES",
    "MANAGE_GUILD",
    "MANAGE_EVENTS",
    "START_EMBEDDED_ACTIVITIES"
];

module.exports.GetDefualtBotPermissions = () => {
    return new Permissions()
    .add("SEND_MESSAGES")
    .add("ATTACH_FILES")
    .add("EMBED_LINKS");
};

/**
 * @param {GuildMember} botMember
 * @param {GuildChannel} channel
 */
module.exports.BotHasPermissions = (botMember, channel) => {
    if(channel.permissionsFor(botMember).has([
        "SEND_MESSAGES",
        "ATTACH_FILES",
        "EMBED_LINKS"
    ])){
        return {
            status: true
        };
    } else {
        return {
            status: false,
            missing: botMember.permissionsIn(channel).toArray()
        };
    };
}