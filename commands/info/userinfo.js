const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../lib/util");

module.exports = {
  name: "userinfo",
  description: "Get info about the user",
  usage: "!!userinfo | !!userinfo <@user>",
  cooldown: 1,
  category: "info",
  guildOnly: true,
  async execute(message) {
    const taggedMember = message.mentions.users.first() || message.author;
    const taggedMemberExtraInfo =
      message.mentions.members.first() || message.member;

    const userEmbed = new MessageEmbed();

    userEmbed
      .setColor("#E78F8E")
      .setAuthor(taggedMember.tag, taggedMember.displayAvatarURL())
      .setTitle(`ID: ${taggedMember.id}`)
      .setThumbnail(taggedMember.displayAvatarURL())
      .addFields(
        {
          name: "Nickname",
          value: taggedMemberExtraInfo.nickname ?? "N/A",
        },
        {
          name: "Server join date",
          value: formatDate(taggedMemberExtraInfo.joinedTimestamp),
        },
        {
          name: "Account creation date",
          value: formatDate(taggedMember.createdTimestamp),
        },
        {
          name: `Roles [${taggedMemberExtraInfo._roles.length}]`,
          value: !taggedMemberExtraInfo._roles.length
            ? "None"
            : taggedMemberExtraInfo._roles.map((role) => `<@&${role}>`),
        }
      );

    await message.channel.send(userEmbed);
  },
};
