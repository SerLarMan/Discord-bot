const { InteractionType } = require("discord.js");

module.exports = async (client, inter) => {
  await inter.deferReply();

  if (inter.type === InteractionType.ApplicationCommand) {
    const command = client.commands.get(inter.commandName);

    if (!command) return "[ERROR] Unespected";
    if (command.voiceChannel) {
      if (!inter.member.voice.channel)
        return "[ERROR] You need to be in a voice channel";
    }

    command.execute({ inter, client });
  }
};
