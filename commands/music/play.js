const { QueryType, useMainPlayer } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "play",
  description: "Play a song",
  options: [
    {
      name: "song",
      description: "The song you want to play",
      type: ApplicationCommandOptionType.String,
      require: true,
    },
  ],

  async execute({ inter, client }) {
    const player = useMainPlayer();

    const song = inter.options.getString("song");
    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length) {
      return inter.followUp("No results found");
    }

    const queue = await player.nodes.create(inter.guild, {
      metadata: inter.channel,
      spotifyBridge: client.config.opt.spotifyBridge,
      volume: client.config.opt.volume,
      leaveOnEmpty: client.config.opt.leaveOnEmpty,
      leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
      leaveOnEnd: client.config.opt.leaveOnEnd,
      leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
    });

    try {
      if (!queue.connection) {
        await queue.connect(inter.member.voice.channel);
      }
    } catch {
      return inter.followUp("I can't join the voice channel");
    }

    await inter.followUp(
      `Loading ${res.playlist ? "your playlist" : res.tracks[0].title} to the queue`
    );
    res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.isPlaying()) await queue.node.play();
  },
};
