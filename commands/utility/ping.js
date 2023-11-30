module.exports = {
  name: "ping",
  description: "Juan Gay",
  async execute({ inter }) {
    await inter.reply("Pong!");
  },
};
