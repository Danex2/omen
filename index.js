const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const AWS = require("aws-sdk")
require("dotenv").config({ path: "./.env.development" });

const ssm = new AWS.SSM({apiVersion: '2014-11-06', region: 'us-east-1'})

const client = new CommandoClient({
  commandPrefix: process.env.NODE_ENV === "development" ? "**" : "!!",
  owner: process.env.OWNER_ID,
  unknownCommandResponse: false,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["fun", "Fun commands"],
    ["info", "Info commands"],
    ["moderation", "Mod commands"],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({ help: false })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
  console.log(`${client.user.tag} is online ⚡️`);
  client.user.setActivity("Discord.js");
});

client.on("error", console.error);

console.log(process.env.TOKEN)

process.env.NODE_ENV !== "development" ? ssm.getParameter({Name: 'TOKEN'}, (err, data) => {
  if (err) console.error(err)
  client.login(data.Parameter.Value);
}) : client.login(process.env.TOKEN)
