const { useQueue } = require("discord-player");

module.exports = {
  name: "shuffle",
  description: "Shuffle the queue",
  voiceChannel: true,

  async execute({ inter }) {
    const queue = useQueue(inter.guild);

    if (!queue || !queue.isPlaying())
      return inter.followUp("No music currently playing");
    if (!queue.tracks.toArray()[0])
      return inter.followUp("No music in the queue after the current one");

    queue.tracks.shuffle();

    return inter.followUp(`Queue shuffled ${queue.tracks.size} song(s)`);
  },
};
