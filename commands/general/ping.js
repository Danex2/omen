module.exports = {
  name: "ping",
  description: "Test ping command.",
  cooldown: 3,
  execute(message) {
    message.channel.send("Pong.");
  },
};
