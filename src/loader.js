const { readdirSync } = require("fs");
const { Collection } = require("discord.js");
const { useMainplayer } = require("discord-player");

// Se crea una colección para los comandos
client.commands = new Collection();

CommandsArray = [];

const DiscordEvents = readdirSync("./events/Discord/").filter((file) =>
  file.endsWith(".js")
);

for (const file of DiscordEvents) {
  const DiscordEvent = require(`../events/Discord/${file}`);
  console.log(`-> [Loaded Discord Event] ${file.split(".")[0]}`);
  client.on(file.split(".")[0], DiscordEvent.bind(null, client));
  delete require.cache[require.resolve(`../events/Discord/${file}`)];
}

readdirSync("./commands/").forEach((dirs) => {
  const commands = readdirSync(`./commands/${dirs}`).filter((files) =>
    files.endsWith(".js")
  );

  for (const file of commands) {
    const command = require(`../commands/${dirs}/${file}`);
    if (command.name && command.description) {
      CommandsArray.push(command);
      console.log(`-> [Loaded Command] ${command.name.toLowerCase()}`);
      client.commands.set(command.name.toLowerCase(), command);
      delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
    } else console.log(`[Failed Command]`);
  }
});

client.on("ready", (client) => {
  if (client.config.app.global) client.application.commands.set(CommandsArray);
  else
    client.guilds.cache
      .get(client.config.app.guild)
      .commands.set(CommandsArray);
});
