'use strict'

function Till(){
  // var data = $.getJSON("/files/hipstercoffee.json")
  // this.shop = mydata[0].shopName;
  // console.log(data);
  // console.log("XXXXXXXXXXXXXXXXXXXXXX");
  // console.log(data[0]);

  // this.shopname = data[0]["shopName"]
  // this.address = data[0]["address"]
  // this.phone = data[0]["phone"]
  // this.prices = data[0]["prices"]
  //++++++++++++++++++++++++++++++++++++++++
  // Remove when json file is working!
  this.shopName = "The Coffee Connection";
  this.address = "123 Lakeside Way";
  this.phone = "+1(650)360-0708";
  this.prices = {"Cafe Latte": 4.75, "Flat White": 4.75,  "Cappucino": 3.85,  "Single Espresso": 2.05,
    "Double Espresso": 3.75,  "Americano": 3.75,  "Cortado": 4.55,  "Tea": 3.65,
    "Choc Mudcake": 6.40,  "Choc Mousse": 8.20,  "Affogato": 14.80,  "Tiramisu": 11.40,
    "Blueberry Muffin": 4.05,  "Chocolate Chip Muffin": 4.05,  "Muffin Of The Day": 4.55};
  //++++++++++++++++++++++++++++++++++++++++
  this.discountTable = {};
  this.basket = [];
  this.receipt = [];
  this.taxPercent = 8.64;
  this.genDiscAmt = 0;
  this.discounts=[{general:5,muffin:10}]
  this.spendAmtBeforeDiscount = 0;
  this.spendAmtAfterDiscount = 0;     // Not yet used!
  this.totalTax = 0;
  this.totalOwed = 0;
  this.INVOICEITEMCHARLENGTH = 30;       // Sets the spacing of the individual invoice items.

}

Till.prototype.addItem = function(item,number){
  if (!this.prices[item]) return false;
  this.basket.push([item,parseInt(number)]);
}

Till.prototype.calcBasicTotal = function(){
  this.spendAmtBeforeDiscount = this.basket.map(v=>this.prices[v[0]]*v[1]).reduce((tot,item)=>{
    return tot + item;
  });
  this.spendAmtBeforeDiscount = Math.round(this.spendAmtBeforeDiscount*100)/100;
}

Till.prototype.createRectHeader = function(){
  // console.log(this.basket);
  var receiptComps = {};
  receiptComps["dateTime"] = createDateTime();
  receiptComps["name"] = this.shopName;
  receiptComps["address"] = this.address;
  receiptComps["phone"] = this.phone;
  receiptComps["purchs"] = createPurchList(this.basket,this.prices, this.INVOICEITEMCHARLENGTH);
  return receiptComps;
}

function createPurchList(purchs,prices,lineLen){
  var listText = purchs.map(v=>{
    var temp = [];
    temp.push(v[0],v[1],prices[v[0]])
    return temp;
  });
  return alignPurchs(listText, lineLen);
}

function alignPurchs(purchs,totLineLen){
  return purchs.map(v=>{
    var qtyPrice = `${v[1]} x £${(v[2]).toFixed(2)}`;
    var item = v[0];
    var lengthRem = totLineLen - qtyPrice.length;
    var line = "";
    if (lengthRem-item.length>0){
      var spaces = padSpaces(lengthRem-item.length);
      line += `${item}${spaces}${qtyPrice}`;
    } else {
      line += `${item.slice(0,lengthRem-item.length-1)} ${qtyPrice}`;
    }
    return line;
  })
}

function padSpaces(len){
  return new Array(len+1).join(" ");
}

function createDateTime(){
  var date = new Date();
  function pad(s) { return (s < 10) ? '0' + s : s; };
  let month = (date.getMonth() + 1);
  let day = (date.getDate());
  let year = (date.getFullYear());
  var retDate = `${[pad(day),pad(month),year].join('/')}`;
  date.toTimeString();
  date.toTimeString().split(' ');
  var retTime=date.toTimeString ().split(' ')[0];
  return retDate + " " + retTime
}
