module.exports = {
  name: "ping",
  description: "Replies with pong along with the ping in milliseconds",
  usage: "!!ping",
  category: "general",
  cooldown: 3,
  async execute(message) {
    const channelMessage = await message.channel.send("Pong.");

    await channelMessage.edit(
      `${channelMessage.content} ${message.client.ws.ping}ms`
    );
  },
};
