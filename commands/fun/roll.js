const { Command } = require("discord.js-commando");

module.exports = class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "roll",
      aliases: ["r"],
      group: "fun",
      memberName: "roll",
      description: "Roll from 1 to whatever number the user specifies",
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
    // add delay after inital message eventually

    return message
      .say("You roll the dice..............................")
      .then((message) =>
        message.edit(
          `The result is ${Math.floor(Math.random() * (number - 1) + 1)}`
        )
      );
  }
};
