const Discord = require('discord.js');
const mongoose = require('mongoose');

var fs = require("fs");

const PREFIX = "$";

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
bot.on("message",function(message) {
  if (message.author.equals(bot.user)) return;
  console.log(message.content);// gives you a output , what is writen in the Chat
  if(!message.content.startsWith(PREFIX)) return;//return if there is no Prefix
  var args = message.content.substring(PREFIX.length).split(" ");

  //all Commands
  switch (args[0].toLowerCase()) {
    case "test"://just for testing purpose(sends message)
      message.channel.send("test done");
      break;
    case "testembed"://just for testing purpose(sends embed)
      var embedtest = new Discord.RichEmbed()
      .setColor(0xcc00cc)
      .addField("by: " + message.member,"command: " + message.content)
      message.channel.send(embedtest)
      break;
      //here the sales should be displayed
    case "sales":
      fs.readFile("sales.txt", "utf-8", (err, data) => {
        var Salesdata = data
        var Salesembed = new Discord.RichEmbed()
        .setTitle("Sales")
        .addField("Sales we currently have saved",data)
        message.channel.send(Salesembed);
      });
      SaleController.get_all(message);
      break;
    case "addsale"://ads a Sale to the List
      const args2 = message.content.slice(PREFIX.length).trim().split(/ +/g);
      var Addsale = args[1] // here schould be the link to the sale
      fs.writeFile("sales.txt", Addsale+ "\r\n",{ flag: 'a+' }, (err) => {// here you should the Command to save it in the database
        if (err) console.log(err);
      });
      console.log(Addsale +"saved");
      message.channel.send("your sale got saved")
      //dumy data
      let saleData = {
        link: "http://foo.bar.baz",
        start: Date("now"),
        end: Date("now"),
        description: "ganz toller test was das denn fuern meeeega sale ist"
      };
      SaleController.add_sale(saleData, message);
      break;
    case "help"://help Command
      var Helpembed = new Discord.RichEmbed()
      .setColor(0x00008B)
      .setTitle("SaleBot Commands:")
      .addField("Prefix : $")
      .addField("$help","gives you this list")
      .addField("$sales","shows you all the Sales we currently have saved in our data")
      .addField("$addsale [Salelink]","you can add a Sale to the Saleslist")
      message.channel.send(Helpembed);
      break;
    default:
      message.channel.send('nope! go away!');
      break;
  };//switch Ding
});//message fuction
