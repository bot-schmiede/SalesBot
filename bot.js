const Discord = require('discord.js');
const mongoose = require('mongoose');

var fs = require("fs");

const PREFIX = process.env.PREFIX ? process.env.PREFIX : '$'

const SaleController = require('./controllers/sales');

let bot = new Discord.Client();

bot.login(process.env.TOKEN);

bot.on('ready', async () => {
  bot.user.setPresence({game: {name: 'type $help to start'}})
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
  '@salesbot-shard-00-01-yyrbx.mongodb.net:27017/' +
  process.env.DB +
  '?ssl=true&replicaSet=SalesBot-shard-0&authSource=admin',
  {
    useNewUrlParser: true,
    dbName: process.env.DB,
  }
)
.then(() => {
  console.log('\nbot connected to database\n')
}).catch(error => {
  console.log(error);
});
mongoose.Promise = global.Promise;


//Execute Commands
bot.on("message", message => {
  if (message.author.equals(bot.user)) return;
  if(!message.content.startsWith(PREFIX)) return;//return if there is no Prefix
  console.log(message.content)
  let args = message.content.substring(PREFIX.length).split(" ");

  //all Commands
  switch (args[0].toLowerCase()) {
      //here the sales should be displayed
    case "sales":
      SaleController.get_all(message);
      break;

    case "addsale"://ads a Sale to the List
      var SaleLink = args[1]// here schould be the link to the sale
      var SaleEnd = args[2]
      var SaleDescription = args[3]// here schould be the description to the sale


      let year = SaleEnd.slice(0, 4);
      console.log('SaleEnd:', SaleEnd)
      let month = SaleEnd.slice(5, 7);
      let day = SaleEnd.slice(8, 10);

      console.log('year:',year, 'month:', month, 'day:', day);

      let theDate = `${year},${month},${day}`;
      let theRealDate = new Date(theDate);

      console.log('theDate: ', theDate);
      console.log('theRealDate: ', theRealDate);

      //message.channel.send(SaleLink+SaleEnd+SaleDescription)
      let saleData = {
        link: SaleLink,
        end: theRealDate,
        description: SaleDescription
      };
      SaleController.add_sale(saleData, message);
      console.log(SaleLink +"and"+SaleDescription+"saved");
      break;

    case "help"://help Command
      var Helpembed = new Discord.RichEmbed()
      .setColor(0x00008B)
      .setTitle("SaleBot Commands:")
      .addField("Prefix : $","-----------------------------------------------------------------------------")
      .addField("$help","gives you this list")
      .addField("$sales","shows you all the Sales we currently have saved in our data")
      .addField("$addsale [Salelink]  [Enddate(YYYY-MM-DD)]  [GameName]","you can add a Sale to the Saleslist")
      message.channel.send(Helpembed);
      break;
    default:
      message.channel.send('there is no command like this one. Try $help');
      break;
  };//switch Ding
});//message fuction
