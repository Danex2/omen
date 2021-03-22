const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const got = require("got");

module.exports = class QuoteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "quote",
      group: "fun",
      memberName: "quote",
      description: "Replies with a random quote",
      guildOnly: true,
    });
  }

  async run(message) {
    try {
      const response = await got("https://api.quotable.io/random", {
        responseType: "json",
      });

      const { content, author } = response.body;

      const quoteEmbed = new MessageEmbed()
        .setTimestamp()
        .addFields(
          { name: "Quote", value: content },
          {
            name: "Author",
            value: author,
          }
        )
        .setColor("#384558");

      return message.embed(quoteEmbed);
    } catch (error) {
      console.error(error);
    }
  }
};
