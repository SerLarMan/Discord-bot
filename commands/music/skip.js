const { useQueue } = require("discord-player");

module.exports = {
  name: "skip",
  description: "Skip to the next track",
  voiceChannel: true,

  execute({ inter }) {
    const queue = useQueue(inter.guild);

    if (!queue || !queue.isPlaying()) {
      return inter.followUp("No music currently playing");
    }

    const success = queue.node.skip();

    return inter.followUp(
      `${success ? "Track skipped" : "Something went wrong"}`
    );
  },
};
