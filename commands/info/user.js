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
        },
      ],
    });
  }

  run(message, { user }) {
    const roles = message.guild.roles.cache.size;
    const userJoinDate = new Intl.DateTimeFormat("en", {
      timeStyle: "full",
      dateStyle: "full",
    }).format(message.guild.createdAt);

    const userCreateDate = new Intl.DateTimeFormat("en", {
      timeStyle: "full",
      dateStyle: "full",
    }).format(message.author.createdAt);

    console.log(message.member.joinedAt);

    if (!user) {
      const serverEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .addFields({ name: "Account creation date", value: userCreateDate })
        .setColor("#384558");
      return message.embed(serverEmbed);
    } else {
      console.log(message.mentions.users.first());
      console.log("yo");
      const serverEmbed = new MessageEmbed()
        .setAuthor(
          message.mentions.users.first().username,
          message.mentions.users.first().avatarURL()
        )
        .addFields({
          name: "Account creation date",
          value: message.mentions.users.first().avatarURL().createdAt,
        })
        .setColor("#384558");
      return message.embed(serverEmbed);
    }
  }
};
