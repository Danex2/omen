const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class KickCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "kick",
      aliases: ["k"],
      group: "moderation",
      memberName: "kick",
      description: "Kick a user from the discord server",
      clientPermissions: ["ADMINISTRATOR"],
      userPermissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
      guildOnly: true,
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
    const kickEmbed = new MessageEmbed()
      .addFields({
        name: `❎  **User ${message.mentions.members.first().user.username}#${
          message.mentions.members.first().user.discriminator
        } was kicked**`.toUpperCase(),
        value: `Reason: ${reason}`,
      })
      .setTimestamp()
      .setColor("#384558");

    message.mentions.members.first().kick(reason);
    return message.embed(kickEmbed);
  }
};
