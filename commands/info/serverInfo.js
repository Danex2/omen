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
    });
  }

  run(message) {
    /**
     * Total members
     * Total roles
     * Server creation date
     * Online members
     * Guild owner
     */

    const roles = message.guild.roles.cache.size;
    const serverCreationDate = new Intl.DateTimeFormat().format(
      message.guild.createdAt
    );

    const onlineMembers = message.guild.members.cache.filter(
      (member) => member.presence.status !== "offline"
    ).size;

    console.log(message.guild.members.cache);

    const serverEmbed = new MessageEmbed()
      .setTitle(`Information about ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL())
      .addFields(
        {
          name: "Members",
          value: message.guild.memberCount,
        },
        { name: "Roles", value: roles },
        { name: "Created", value: serverCreationDate },
        { name: "Owner", value: message.guild.owner },
        { name: "Region", value: message.guild.region },
        { name: "Online Members", value: onlineMembers }
      )
      .setColor("#384558");

    return message.embed(serverEmbed);
  }
};
