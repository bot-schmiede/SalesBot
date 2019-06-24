const Discord = require('discord.js');

const PREFIX = "$";

let bot = new Discord.Client();

bot.login(process.env.TOKEN);

bot.on('ready', async () => {
  bot.user.setPresence({game: {name: 'ready to rock'}})
  .then(console.log)
  .catch(console.error);
});
