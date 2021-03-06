'use strict'

function Till(source="./files/hipstercoffee.json"){

  var data = $.ajax({type: "GET", url: source, async: false}).responseText; // Synchronous call.
  data = JSON.parse(data);
  this.shopName = data[0]["shopName"];
  this.address = data[0]["address"];
  this.phone = data[0]["phone"];
  this.prices = data[0]["prices"][0];

  //++++++++++++++++++++++++++++++++++++++++
  // HARDCODED VALUES.
  // You can use the hard coded values below if you do not run the website from a server.
  // You will not be able to access the JSON file if running the website from a local file system
  // (and not a server). You will get the following error if running the website from a local file system :
  // "jquery-2.1.4.min.js:4 XMLHttpRequest cannot load file:///files/hipstercoffee.json.
  // Cross origin requests are only supported for protocol schemes: http, data, chrome,
  // chrome-extension, https, chrome-extension-resource".
  // You will also need to disable "checkLocation()" in till.js as this redirects the webpage
  // if the website is not running on a webserver.
  // Uncomment these values if needed:

  // this.shopName = "The Coffee Connection";
  // this.address = "123 Lakeside Way";
  // this.phone = "+1(650)360-0708";
  // this.prices = {"Cafe Latte": 4.75, "Flat White": 4.75,  "Cappucino": 3.85,  "Single Espresso": 2.05,
  //   "Double Espresso": 3.75,  "Americano": 3.75,  "Cortado": 4.55,  "Tea": 3.65,
  //   "Choc Mudcake": 6.40,  "Choc Mousse": 8.20,  "Affogato": 14.80,  "Tiramisu": 11.40,
  //   "Blueberry Muffin": 4.05,  "Chocolate Chip Muffin": 4.05,  "Muffin Of The Day": 4.55};

  //++++++++++++++++++++++++++++++++++++++++

  this.discountTable = {};
  this.basket = [];
  this.receiptComps = {};
  this.taxPercent = 8.64;
  this.genDiscAmt = 0;
  this.discounts={general:5,muffin:10}
  this.spendAmtBeforeDiscount = 0;
  this.totalTax = 0;
  this.totalOwed = 0;
  this.cashTendered = 0;
  this.changeOwed = 0;
  this.message = ["xxx",0];
  this.GENERALDISCOUNTTHRESHHOLD = 50;
  this.INVOICEITEMCHARLENGTH = 30;       // In chars. Sets the spacing of the individual invoice items.
  this.RECEIPTWIDTH = 240;               // In pixels. Used to dynamically set receipt width.
  this.CURRENTPURCHLISTWIDTH = 320;      // In pixels. Used to dynamically set the constantly updating, purchase list width.
}

Till.prototype.reset = function(){
  this.basket = [];
  this.receiptComps = {};
  this.cashTendered = 0;
  this.genDiscAmt = 0;
  this.spendAmtBeforeDiscount = 0;
  this.totalTax = 0;
  this.totalOwed = 0;
  this.cashTendered = 0;
  this.changeOwed = 0;
  this.message = ["xxx",0];
  this.createRectHeader();
}

Till.prototype.addItem = function(item,number){
  if (!item) {
    this.message = ["You have not entered an item to add.",1];
    return false;
  }
  if (!this.prices[item]) {
    this.message = ["That item does not exist.",1];
    return false;
  }
  if (!parseInt(number)) {
    this.message = ["No quantity has been entered.",1];
    return false;
  }
  if (parseFloat(number)!=parseInt(number)||parseInt(number)<=0) {
    this.message = ["An invalid quantity has been entered.",1];
    return false;
  }
  this.basket.push([item,parseInt(number)]);
}

Till.prototype.calcBasicTotal = function(){
  if (!this.anyItemsOrdered()) {
    return false;
  }
  this.spendAmtBeforeDiscount = this.basket.map(v=>this.prices[v[0]]*v[1]).reduce((tot,item)=>{
    return tot + item;
  });
  this.spendAmtBeforeDiscount = (Math.round(this.spendAmtBeforeDiscount*100)/100).toFixed(2);
}

Till.prototype.calcBasicDiscount = function(){
  if (this.spendAmtBeforeDiscount >= this.GENERALDISCOUNTTHRESHHOLD){
    this.genDiscAmt = this.discounts["general"]/100 * this.spendAmtBeforeDiscount;
  }
  this.genDiscAmt = ((Math.round(this.genDiscAmt*100))/100).toFixed(2);
}

Till.prototype.calcTaxation = function(){
  this.totalTax = this.taxPercent/100 * this.spendAmtBeforeDiscount;
  this.totalTax = ((Math.round(this.totalTax*100))/100).toFixed(2);
}

Till.prototype.finalTotal = function(){
  this.totalOwed = parseFloat(this.spendAmtBeforeDiscount)-parseFloat(this.genDiscAmt);
  this.totalOwed = (this.totalOwed).toFixed(2);
}

Till.prototype.tenderCash = function(cash){
  if (!this.anyItemsOrdered()){
    this.message = ["No items have been added yet.",1];
    return false;
  }
  if ((!cash)||(isNaN(cash* 1))){
    this.message = ["No cash amount has been entered.",1];
    return false;
  }
  if (cash<(parseFloat(this.spendAmtBeforeDiscount)-parseFloat(this.genDiscAmt))){
    this.message = ["You have not entered enough cash.",1];
    return false;
  }
  this.cashTendered = (parseFloat(cash)).toFixed(2);
}

Till.prototype.anyItemsOrdered = function(){
  return (this.basket.length>0);
}

Till.prototype.calcCashOwed = function(cash){
  this.changeOwed = parseFloat(this.cashTendered)-parseFloat(this.totalOwed);
  this.changeOwed = (this.changeOwed).toFixed(2);
}

Till.prototype.createRectHeader = function(){
  this.calcBasicTotal();
  this.calcBasicDiscount();
  this.calcTaxation();
  this.finalTotal();
  this.calcCashOwed();
  if (this.basket.length == 0){
    this.message = ["No items have been added yet.",1];
    return 0;
  } else if (parseFloat(this.cashTendered) == 0){
    this.message = ["Enter a cash received amount first.",1];
    return 0;
  }

  this.receiptComps["dateTime"] = createDateTime();
  this.receiptComps["name"] = this.shopName;
  this.receiptComps["address"] = this.address;
  this.receiptComps["phone"] = this.phone;
  this.receiptComps["purchs"] = createPurchList(this.basket,this.prices, this.INVOICEITEMCHARLENGTH,"purchsListForReceipt");
  this.receiptComps["grossTotal"] = align(this.spendAmtBeforeDiscount, this.INVOICEITEMCHARLENGTH, "Total");
  if (this.genDiscAmt>0){
    this.receiptComps["basicDiscount"] = align(this.genDiscAmt, this.INVOICEITEMCHARLENGTH, `General ${this.discounts["general"]}% discount`);
  }
  this.receiptComps["totalTax"] = align(this.totalTax, this.INVOICEITEMCHARLENGTH, `Tax at ${this.taxPercent}%`);
  this.receiptComps["grandTotal"] = align(this.totalOwed, this.INVOICEITEMCHARLENGTH, "Total:");
  this.receiptComps["cash"] = align(this.cashTendered, this.INVOICEITEMCHARLENGTH, "Cash:");
  this.receiptComps["change"] = align(this.changeOwed, this.INVOICEITEMCHARLENGTH, "Change:");
  return this.receiptComps;
}

Till.prototype.createInterimPurchList = function(){
  var interimPurchList = createPurchList(this.basket,this.prices, this.INVOICEITEMCHARLENGTH+10,"purchsListForDisplay")
  // Added 10 chars because the "purchsListForDisplay" is wider than the "purchsListForReceipt".
  return interimPurchList;
}

function createPurchList(purchs, prices, lineLen, mode){
  var listText = createPurchListArray(purchs, prices);
  return alignPurchs(listText, lineLen, mode);
}

function createPurchListArray(purchs, prices){
  var listText = purchs.map(v=>{
    var temp = [];
    temp.push(v[0],v[1],prices[v[0]])
    return temp;
  });
  return listText;
}

function align(item, totLineLen, textPrefix){
  var lengthRem = totLineLen - item.toString().length - textPrefix.length;
  var line = "";
  var spaces = "";
  lengthRem>0 ? spaces = padSpaces(lengthRem) : spaces = "";
  line += `${textPrefix}${spaces}${item}`;
  return line;
}

function alignPurchs(purchs,totLineLen, mode){
  return purchs.map(v=>{
    if (mode=="purchsListForReceipt"){
      var qtyPrice = `${v[1]} x £${(v[2]).toFixed(2)}`;
    } else if (mode=="purchsListForDisplay"){
      var qtyPrice = `${v[1]} x £${(v[2]).toFixed(2)} = £${(v[1]*v[2]).toFixed(2)}`;
    }
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
