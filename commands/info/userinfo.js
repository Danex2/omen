const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../lib/util");

module.exports = {
  name: "userinfo",
  description: "Get info about the user",
  async execute(message) {
    const taggedMember = message.mentions.users.first();

    const userEmbed = new MessageEmbed();

    if (!message.mentions.users.size) {
      // didn't tag anyone so get my info
      userEmbed
        .setColor("#E78F8E")
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle(`ID: ${message.author.id}`)
        .setThumbnail(message.author.displayAvatarURL())
        .addFields(
          {
            name: "Nickname",
            value: message.member.displayName,
          },
          {
            name: "Server join date",
            value: formatDate(message.member.joinedTimestamp),
          },
          {
            name: "Account creation date",
            value: formatDate(message.author.createdTimestamp),
          },
          {
            name: `Roles [${message.member._roles.length}]`,
            value: !message.member._roles.length
              ? "None"
              : message.member._roles.map((role) => `<@&${role}>`),
          }
        );

      await message.channel.send(userEmbed);
    } else {
      // get info about tagged user
      userEmbed
        .setColor("#E78F8E")
        .setAuthor(taggedMember.tag, taggedMember.displayAvatarURL())
        .setTitle(`ID: ${taggedMember.id}`)
        .setThumbnail(taggedMember.displayAvatarURL())
        .addFields(
          {
            name: "Nickname",
            value: message.mentions.members.first().displayName,
          },
          {
            name: "Server join date",
            value: formatDate(message.mentions.members.first().joinedTimestamp),
          },
          {
            name: "Account creation date",
            value: formatDate(taggedMember.createdTimestamp),
          },
          {
            name: `Roles [${message.mentions.members.first()._roles.length}]`,
            value: !message.mentions.members.first()._roles.length
              ? "None"
              : message.mentions.members
                  .first()
                  ._roles.map((role) => `<@&${role}>`),
          }
        );

      await message.channel.send(userEmbed);
    }
  },
};
