const { Command } = require("discord.js-commando");

module.exports = class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "roll",
      group: "fun",
      memberName: "roll",
      description: "Roll from 1 to whatever number the user specifies",
      guildOnly: true,
      args: [
        {
          key: "number",
          prompt: "Pick a number",
          default: 100,
          type: "string",
        },
      ],
    });
  }

  run(message, { number }) {
    return message.say("You roll the dice.....").then((message) => {
      setTimeout(() => {
        message.edit(
          `Your roll is: ${Math.floor(Math.random() * (number - 1) + 1)}`
        );
      }, 2000);
    });
  }
};
