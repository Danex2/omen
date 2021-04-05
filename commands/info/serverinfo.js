const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../lib/util");

module.exports = {
  name: "serverinfo",
  description: "Get info about the server",
  usage: "!!serverinfo",
  cooldown: 1,
  category: "info",
  guildOnly: true,
  async execute(message) {
    const serverEmbed = new MessageEmbed();

    const server = message.guild;

    serverEmbed
      .setColor("#E78F8E")
      .setAuthor(server.name, server.iconURL())
      .setTitle(`ID: ${server.id}`)
      .setThumbnail(server.iconURL())
      .addFields(
        { name: "Owner", value: server.owner },
        { name: "Members", value: server.memberCount },
        {
          name: "Channels (Text + Voice + Category)",
          value: server.channels.cache.size,
          inline: true,
        },
        {
          name: "Partnered",
          value: server.partnered,
        },
        {
          name: "Server boosts",
          value: server.premiumSubscriptionCount,
        },
        {
          name: "Region",
          value: server.region,
        },
        {
          name: `Roles [${server.roles.cache.size - 1}]`,
          value: server.roles.cache
            .filter((role) => role.name !== "@everyone")
            .map(({ id }) => `<@&${id}>`),
          inline: true,
        },
        {
          name: "Created",
          value: formatDate(server.createdAt),
        }
      );

    await message.channel.send(serverEmbed);
  },
};
