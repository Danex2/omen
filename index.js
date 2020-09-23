const { CommandoClient } = require("discord.js-commando");
const path = require("path");
require("dotenv").config({ path: "./.env.development" });

const client = new CommandoClient({
  commandPrefix: "!!",
  owner: process.env.OWNER_ID,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([["fun", "Your First Command Group"]])
  .registerDefaultGroups()
  .registerDefaultCommands({ help: false })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
  console.log(`${client.user.tag} is online ✨`);
  client.user.setActivity("Discord.js");
});

client.on("error", console.error);

client.login(process.env.TOKEN);
