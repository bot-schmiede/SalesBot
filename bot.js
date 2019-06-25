const Discord = require('discord.js');
const mongoose = require('mongoose');

const PREFIX = "$";

const sale = require('./models/sale');


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
  '@sales-bot-shard-00-01-n9i0u.mongodb.net:27017/test?ssl=true&replicaSet=sales-bot--shard-0&authSource=admin',
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

      let saleData = {
        link: "http://foo.bar.baz",
        start: Date("now"),
        end: Date("now"),
        description: "ganz toller test was das denn fuern meeeega sale ist"
      };

      const Sale = new sale({
        _id: new mongoose.Types.ObjectId(),
        link: saleData.link,
        start: saleData.start,
        end: saleData.end,
        description: saleData.description
      });

      Sale.save()
      .then(respons => {
        message.channel.send(response);
      })
      .catch(err => {
        console.error(err);
        message.channel.send(response);
      });

      break;
    case 'bar':
      message.channel.send('nope! not yet!');
    break;
    default:
      message.channel.send('soon tm');
      break;
  }
});
