const Discord = require('discord.js');
const mongoose = require('mongoose');
const Sale = require('../models/sale');
var fs = require("fs");

exports.get_all = (message) => {//exports all! the data from the database
  Sale.find()
  .exec()
  .then(docs => {
    console.log(docs)
    //message.channel.send(docs);
    //try to filter data
    fs.writeFile("sales.txt",docs, (err) => {
      console.log("sales got exportet from database into local txt")
      if (err) console.log(err);
    });
    fs.readFile('./sales.txt', 'utf-8', function(err, data) {
  if (err) throw err;
  var RemId = data.replace(/ __v: 0 },/gim, '');
  var Splitsales = RemId.split("{ _id:")

  console.log(Splitsales)

  var Saleone = Splitsales[1] //1. sale
  var Saletwo = Splitsales[2] //2. sale
  var Sale3 = Splitsales[3] //3. sale
  var Sale4 = Splitsales[4]
  var Sale5 = Splitsales[5]

  var SecndsplitSaleone = Saleone.split(" ")// split after every space
  var SecndsplitSaletwo = Saletwo.split(" ")
  var SecndsplitSale3 = Sale3.split(" ")
  var SecndsplitSale4 = Sale4.split(" ")
  var SecndsplitSale5 = Sale5.split(" ")

  var Saleoneone = SecndsplitSaleone[1] //copy the ID into a var
  var Saletwotwo = SecndsplitSaletwo[1]
  var Sale33 = SecndsplitSale3[1]
  var Sale44 = SecndsplitSale4[1]
  var Sale55 = SecndsplitSale5[1]

  console.log(Saleoneone)
  console.log(Saletwotwo)
  console.log(Sale33)
  console.log(Sale44)
  console.log(Sale55)

  var SaleoneoneRemID = Saleone.replace(Saleoneone, '')
  var SaletwotwoRemID = Saletwo.replace(Saletwotwo, '')
  var Sale33RemID = Sale3.replace(Sale33, '')
  var Sale44RemID = Sale4.replace(Sale44, '')
  var Sale55RemID = Sale5.replace(Sale55, '')

/*  message.channel.send(SaleoneoneRemID)
  message.channel.send(SaletwotwoRemID)
  message.channel.send(Sale33RemID)
  message.channel.send(Sale44RemID)
  message.channel.send(Sale55RemID)
*/
  var Salesembed = new Discord.RichEmbed()
    .setColor(0x00008B)
    .setTitle("Sales")
    .addField("1. Sale:",SaleoneoneRemID)
    .addField("2. Sale:",SaletwotwoRemID)
    .addField("3. Sale:",Sale33RemID)
    .addField("4. Sale:",Sale44RemID)
    .addField("5. Sale:",Sale55RemID)


    message.channel.send(Salesembed);

  fs.writeFile('./sales.txt', SaleoneoneRemID+SaletwotwoRemID+Sale33RemID+Sale44RemID+Sale55RemID/*+Remkommata+Remgaensefueschenmiteinemfus*/, 'utf-8', function(err) {
    if (err) throw err;
    console.log('File formated');
  });
});
    console.log(docs)
  })
  .catch(console.error)
}


exports.add_sale = (saleData, message) => { //saves the data into the database
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
  console.log("sale added")
  message.channel.send("sale added")
  })
  .catch(err => {
    message.channel.send(err);
    console.error(err);
  });
}
