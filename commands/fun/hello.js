const { Command } = require("discord.js-commando");

module.exports = class HelloCommand extends Command {
  constructor(client) {
    super(client, {
      name: "hello",
      aliases: ["h"],
      group: "fun",
      memberName: "hello",
      description: "Replies with pong.",
    });
  }

  run(message) {
    return message.say(`Hello ${message.author}`);
  }
};
