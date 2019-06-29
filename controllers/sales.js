const mongoose = require('mongoose');
const Sale = require('../models/sale');
const Discord = require('discord.js');

exports.get_all = (message) => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  this.message = message;
  Sale.find()
  .where('end').gt(date)
  .exec()
  .then(docs => {
    docs.forEach((doc, idx, message) => {
      //console.log(doc);
      let Salesembed = new Discord.RichEmbed()
        .setTitle(doc.description)
        .addField("link",doc.link)
        .addField("until:", doc.end)
        this.message.channel.send(Salesembed);
    });
  })
  .catch(console.error)
}

exports.add_sale = (saleData, message) => {
  const sale = new Sale({
    _id: new mongoose.Types.ObjectId(),
    link: saleData.link,
    start: saleData.start,
    end: saleData.end,
    description: saleData.description
  });
  sale.save()
  .then(doc => {
    console.log(doc);
    message.channel.send('sale added');
  })
  .catch(err => {
    message.channel.send(err);
    console.error(err);
  });
}
