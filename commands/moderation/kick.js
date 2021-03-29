const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kick a user from server",
  cooldown: 1,
  guildOnly: true,
  usage: "!!kick <@user> <reason>",
  category: "moderation",
  args: true,
  permissions: "KICK_MEMBERS",
  async execute(message, args) {
    try {
      const userToKick = message.mentions.members.first();

      const kickEmbed = new MessageEmbed().setAuthor();

      if (args.length < 2) {
        return message.reply("Missing args: <user> OR <reason>");
      }

      if (!userToKick) {
        return message.reply("Invalid user");
      }

      const userId = args.filter((arg) => arg.startsWith("<@!"));
      const reason = args.filter((arg) => !arg.startsWith("<@!"));

      userToKick.kick(reason[0]);

      await message.channel.send("kick");
    } catch (error) {
      console.error(error.message);
    }
  },
};
