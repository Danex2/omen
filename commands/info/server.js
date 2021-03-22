const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class ServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: "server",
      aliases: ["s"],
      group: "info",
      memberName: "server",
      description: "Basic info about the current server",
      guildOnly: true,
    });
  }

  run(message) {
    /**
     * Total members
     * Total roles
     * Server creation date
     * Guild owner
     */

    const roles = message.guild.roles.cache.size;
    const serverCreationDate = new Intl.DateTimeFormat("en-US", {
      timeStyle: "full",
      dateStyle: "full",
    }).format(message.guild.createdAt);

    const serverEmbed = new MessageEmbed()
      .setTitle(`Server ID: ${message.guild.id}`)
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {
          name: "Members",
          value: message.guild.memberCount,
        },
        { name: "Roles", value: roles },
        { name: "Region", value: message.guild.region },
        { name: "Owner", value: message.guild.owner },
        { name: "Created", value: serverCreationDate }
      )
      .setColor("#384558");

    return message.embed(serverEmbed);
  }
};
