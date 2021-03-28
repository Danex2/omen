const prefix = require("../../index");
const { MessageEmbed } = require("discord.js");
const { groupBy } = require("../../lib/util");

module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  usage: "!!help | !!help <command name>",
  category: "info",
  cooldown: 5,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;
    const helpEmbed = new MessageEmbed();

    const groupedCommands = groupBy(
      commands.map(({ name, category }) => ({
        name,
        category,
      })),
      "category"
    );

    if (!args.length) {
      data.push(
        `\nYou can send \`${prefix.prefix}help [command name]\` to get info on a specific command!`
      );

      helpEmbed
        .setAuthor(`List of all ${commands.size} commands 📜`)
        .setColor("#E78F8E")
        .addFields(
          {
            name: "General",
            value: groupedCommands.general
              .map(({ name }) => `${name}`)
              .join(", "),
          },
          {
            name: "Info",
            value: groupedCommands.info.map(({ name }) => `${name}`).join(", "),
          }
        );

      return message.channel.send(helpEmbed);
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name);

    if (!command) {
      return message.channel.send("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** ${prefix.prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    helpEmbed
      .setTitle(`${command.name}`)
      .setColor("#E78F8E")
      .addFields(
        { name: "Usage", value: command.usage },
        { name: "Description", value: command.description },
        { name: "Cooldown", value: `${command.cooldown} second(s)` }
      );

    message.channel.send(helpEmbed);
  },
};
