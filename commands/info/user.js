const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class ServerCommand extends Command {
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
          default: "",
        },
      ],
    });
  }

  run(message, { user }) {
    let userJoinDate;
    let userCreateDate;

    if (!user) {
      userJoinDate = new Intl.DateTimeFormat("en", {
        timeStyle: "medium",
        dateStyle: "full",
      }).format(message.member.joinedAt);

      userCreateDate = new Intl.DateTimeFormat("en", {
        timeStyle: "medium",
        dateStyle: "full",
      }).format(message.author.createdAt);

      const serverEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .addFields(
          { name: "Account creation date", value: userCreateDate },
          { name: "Join date", value: userJoinDate }
        )
        .setColor("#384558");
      return message.embed(serverEmbed);
    } else {
      userJoinDate = new Intl.DateTimeFormat("en", {
        timeStyle: "medium",
        dateStyle: "full",
      }).format(message.mentions.members.first().joinedTimestamp);

      userCreateDate = new Intl.DateTimeFormat("en", {
        timeStyle: "medium",
        dateStyle: "full",
      }).format(message.mentions.members.first().user.createdAt);

      const serverEmbed = new MessageEmbed()
        .setAuthor(
          message.mentions.users.first().username,
          message.mentions.users.first().avatarURL()
        )
        .addFields(
          { name: "Creation date", value: userCreateDate },
          {
            name: "Join date",
            value: userJoinDate,
          }
        )
        .setColor("#384558");
      return message.embed(serverEmbed);
    }
  }
};
