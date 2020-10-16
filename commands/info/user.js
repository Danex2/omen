const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class UserCommand extends Command {
  constructor(client) {
    super(client, {
      name: "user",
      aliases: ["u"],
      group: "info",
      memberName: "user",
      description: "Basic info about the user",
      args: [
        {
          key: "user",
          prompt: "Enter a username",
          type: "string",
        },
      ],
    });
  }

  run(message) {
    const userJoinDate = new Intl.DateTimeFormat("en", {
      timeStyle: "medium",
      dateStyle: "full",
    }).format(message.mentions.members.first().joinedTimestamp);

    const userCreateDate = new Intl.DateTimeFormat("en", {
      timeStyle: "medium",
      dateStyle: "full",
    }).format(message.mentions.members.first().user.createdAt);

    const userRoles = message.mentions.members
      .first()
      .roles.cache.filter((role) => role.name !== "@everyone")
      .map((role) => `<@&${role.id}>`);

    const serverEmbed = new MessageEmbed()
      .setAuthor(
        message.mentions.users.first().username,
        message.mentions.users.first().avatarURL()
      )
      .addFields(
        {
          name: `Roles [${message.mentions.members.first()._roles.length}]`,
          value: userRoles,
          inline: true,
        },
        {
          name: "Server join date",
          value: userJoinDate,
        },
        { name: "Creation date", value: userCreateDate }
      )
      .setColor("#384558")
      .setTimestamp();
    return message.embed(serverEmbed);
  }
};
