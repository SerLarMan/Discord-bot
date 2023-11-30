// Evento que se encarga del despleigue del bot
module.exports = async(client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`)
  client.user.setActivity(client.config.app.playing)
}

/* module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
}; */
