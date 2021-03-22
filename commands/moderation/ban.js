const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      group: "moderation",
      memberName: "ban",
      description: "Ban a user from the discord server",
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
          key: "days",
          prompt: "The amount of days to ban the person for",
          type: "integer",
        },
        {
          key: "reason",
          prompt: "Reason why user was banned",
          type: "string",
        },
      ],
    });
  }

  run(message, { days, reason }) {
    const member = message.mentions.members.first();

    const banEmbed = new MessageEmbed()
      .addFields({
        name: "🔨 Ban Report",
        value: `User **${member.user.username}#${member.user.discriminator}** was banned!`,
      })
      .addFields({
        name: "Reason",
        value: reason,
      })
      .addFields({
        name: "Duration",
        value: `${days} days`,
      })
      .setTimestamp()
      .setColor("#384558");

    message.mentions.members.first().ban({ days, reason });
    return message.embed(banEmbed).catch((e) => console.log(e));
  }
};
