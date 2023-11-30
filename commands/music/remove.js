const { ApplicationCommandOptionType } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: "remove",
  description: "Remove a song from the queue",
  options: [
    {
      name: "number",
      description: "The place in the queue",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],

  async execute({ inter }) {
    const number =  inter.options.getNumber('number')
    const queue = useQueue(inter.guild);

    const index = number - 1;
    const trackName = queue.tracks.toArray()[index].title;
    if (!trackName) return inter.followUp("This track is not in the queue");

    queue.removeTrack(index);
    return inter.followUp(`${trackName} removed from the queue`);
  },
};
