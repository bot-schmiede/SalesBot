const Discord = require('discord.js');
const mongoose = require('mongoose');

const PREFIX = "$";

const SaleController = require('./controllers/sales');

let bot = new Discord.Client();

bot.login(process.env.TOKEN);

bot.on('ready', async () => {
  bot.user.setPresence({game: {name: 'ready to rock'}})
  .then(console.log)
  .catch(console.error);
  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch(e) {
    console.log(e.stack);
  }
});

//conect to DB
mongoose.connect(
  'mongodb://' +
  process.env.USER + ':' +
  process.env.PASSWD +
  '@sales-bot-shard-00-01-n9i0u.mongodb.net:27017/test?ssl=true&replicaSet=Sales-Bot-shard-0&authSource=admin',
  {
    useNewUrlParser: true,
    dbName: 'test',
  }
)
.then(() => {
  console.log('\nconnected to database\n')
}).catch(error => {
  console.log(error);
});
mongoose.Promise = global.Promise;




//Execute Commands
bot.on('message', message => {
  if(message.author.equals(bot.user)) return;
  if(!message.content.startsWith(PREFIX)) return;

  msgArray = message.content.substring(PREFIX.length).split(' ');
  let cmd = msgArray[0].toLowerCase();

  switch(cmd) {
    case 'foo':
      //dumy data
      let saleData = {
        link: "http://foo.bar.baz",
        start: Date("now"),
        end: Date("now"),
        description: "ganz toller test was das denn fuern meeeega sale ist"
      };
      SaleController.add_sale(saleData, message);
      break;
    case 'bar':
    SaleController.get_all(message);
    break;
    default:
      message.channel.send('soon tm');
      break;
  }
});
