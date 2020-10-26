const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      aliases: ["b"],
      group: "moderation",
      memberName: "ban",
      description: "Ban a user from the discord server",
      clientPermissions: ["ADMINISTRATOR"],
      userPermissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
      args: [
        {
          key: "user",
          prompt: "@ the user",
          type: "string",
        },
        {
          key: "reason",
          prompt: "Reason why user was banned",
          type: "string",
        },
      ],
    });
  }

  run(message, { user, reason }) {
    const banEmbed = new MessageEmbed()
      .addFields({
        name: ` 🔨 **User ${message.mentions.members.first().user.username}#${
          message.mentions.members.first().user.discriminator
        } was banned**`.toUpperCase(),
        value: `**Reason:** ${reason}`,
      })
      .setTimestamp()
      .setColor("#384558");

      // Should check if user exists, right permissions, role permissions etc

     message.mentions.members
      .first()
      .ban({days: 7, reason})
      return message.embed(banEmbed)

  }
};
