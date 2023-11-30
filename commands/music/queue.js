const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "queue",
  description: "Get the queue",
  voiceChannel: true,

  execute({ inter }) {
    const queue = useQueue(inter.guild);

    if (!queue) return inter.followUp("No music currently playing");

    if (!queue.tracks.toArray()[0])
      return inter.followUp("No music in the queue after this one");

    const songs = queue.tracks.size;
    const nextSongs =
      songs > 5
        ? `And **${songs - 5}** more song(s)`
        : `In the queue **${songs}** song(s)`;
    const tracks = queue.tracks.map(
      (track, i) => `**${i + 1}** - ${track.title}`
    );

    const embed = new EmbedBuilder()
      .setColor("#5d6a8c")
      .setDescription(
        `Current ${queue.currentTrack.title}\n\n${tracks
          .slice(0, 5)
          .join("\n")}\n\n${nextSongs}`
      );

    inter.editReply({ embeds: [embed] });
  },
};
