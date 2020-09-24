const { CommandoClient } = require("discord.js-commando");
const path = require("path");
require("dotenv").config({ path: "./.env.development" });

const client = new CommandoClient({
  commandPrefix: "!!",
  owner: process.env.OWNER_ID,
  unknownCommandResponse: false,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([["fun", "Fun commands"]])
  .registerDefaultGroups()
  .registerDefaultCommands({ help: false })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
  console.log(`${client.user.tag} is online ✨`);
  client.user.setActivity("Discord.js");
});

client.on("error", console.error);

client.login(process.env.TOKEN);
