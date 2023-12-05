// Evento que se encarga del despleigue del bot
module.exports = async(client) => {
  console.log('-----------------------------------------------')
  console.log('                  BOT READY                    ')
  console.log(`     Name:                   ${client.user.tag}`)
  console.log(`     Guild:                  ${client.guilds.cache.map(guild => guild.name)}`)
  console.log('-----------------------------------------------')
  client.user.setActivity(client.config.app.playing)
}
