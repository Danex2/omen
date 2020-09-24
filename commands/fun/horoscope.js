const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const got = require("got");

module.exports = class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "horoscope",
      aliases: ["h"],
      group: "fun",
      memberName: "horoscope",
      description: "Returns the horoscope message of the day",
      args: [
        {
          key: "sign",
          prompt: "Enter your sunsign",
          type: "string",
        },
      ],
    });
  }

  async run(message, { sign }) {
    try {
      const response = await got(
        `http://horoscope-api.herokuapp.com/horoscope/today/${sign}`,
        {
          responseType: "json",
        }
      );

      const { date, horoscope, sunsign } = response.body;

      const horoscopeEmbed = new MessageEmbed()
        .setTitle(sunsign.charAt(0).toUpperCase() + sunsign.slice(1))
        .addFields({
          name: "Horoscope",
          value: horoscope,
        })
        .setFooter(date)
        .setColor("#384558");
      return message.embed(horoscopeEmbed);
    } catch (e) {
      console.error(e);
    }
  }
};
