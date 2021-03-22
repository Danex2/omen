const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class UserCommand extends Command {
  constructor(client) {
    super(client, {
      name: "user",
      group: "info",
      memberName: "user",
      description: "Basic info about the user",
      guildOnly: true,
      args: [
        {
          key: "user",
          prompt: "Enter a username",
          type: "string",
        },
      ],
      argsPromptLimit: 0,
      examples: ["!!user <@user>"],
    });
  }

  onError(error, message) {
    console.log(error.stack);
    return message.say(
      "There was an error processing the command, please try again in a few minutes"
    );
  }

  usage(command, prefix, user) {
    return;
  }

  run(message) {
    const user = message.mentions.users.first();

    const userJoinDate = new Intl.DateTimeFormat("en", {
      timeStyle: "medium",
      dateStyle: "full",
    }).format(user.joinedTimestamp);

    const userCreateDate = new Intl.DateTimeFormat("en", {
      timeStyle: "medium",
      dateStyle: "full",
    }).format(message.mentions.members.first().user.createdAt);

    const userRoles = message.mentions.members
      .first()
      .roles.cache.filter((role) => role.name !== "@everyone")
      .map((role) => `<@&${role.id}>`);

    const userEmbed = new MessageEmbed()
      .setAuthor(user.username, user.avatarURL())
      .addFields(
        {
          name: "User ID",
          value: user.id,
        },
        {
          name: "Avatar URL",
          value: `[Link](${user.avatarURL()})`,
        },
        {
          name: `Roles [${userRoles.length}]`,
          value: userRoles.length > 0 ? userRoles : "none",
        },
        {
          name: "Server join date",
          value: userJoinDate,
        },
        { name: "Account creation date", value: userCreateDate }
      )
      .setColor("#384558")
      .setThumbnail(user.avatarURL())
      .setTimestamp();

    return message.embed(userEmbed);
  }
};
