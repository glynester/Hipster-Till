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
  // this.receipt = [];
  this.taxPercent = 8.64;
  this.genDiscAmt = 0;
  this.discounts={general:5,muffin:10}
  this.spendAmtBeforeDiscount = 0;
  this.totalTax = 0;
  this.totalOwed = 0;
  this.cashTendered = 0;
  this.changeOwed = 0;
  this.GENERALDISCOUNTTHRESHHOLD = 50;
  this.INVOICEITEMCHARLENGTH = 30;       // In chars. Sets the spacing of the individual invoice items.
  this.RECEIPTWIDTH = 240;               // In pixels. Used to dynamically set receipt width.
  this.CURRENTPURCHLISTWIDTH = 320;      // In pixels. Used to dynamically set the constantly updating, purchase list width.
}

Till.prototype.addItem = function(item,number){
  if (!item) {
    console.log("You have not entered an item to add.")
    return false;
  }
  if (!this.prices[item]) {
    console.log("That item does not exist.")
    return false;
  }
  if (!parseInt(number)) {
    console.log("No quantity has been entered.");
    return false;
  }
  this.basket.push([item,parseInt(number)]);
}

Till.prototype.calcBasicTotal = function(){
  if (this.basket.length==0) {
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
  this.createRectHeader();          // Need to update final amount owed to calculate if cash is sufficient.
  if (!this.anyItemsOrdered()){
    console.log("No items have been ordered yet.");
    return false;
  }
  if ((!cash)||(!parseFloat(cash))){
    console.log("No cash amount has been entered.");
    return false;
  }
  console.log(cash,this.totalOwed);
  if (cash<this.totalOwed){
    console.log("You have not entered anough cash.");
    return false;
  }
  this.cashTendered = (parseFloat(cash)).toFixed(2);
}

Till.prototype.anyItemsOrdered = function(cash){
  return this.basket.length>0;
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
  if(till.cashTendered==0)return false;
  var receiptComps = {};
  receiptComps["dateTime"] = createDateTime();
  receiptComps["name"] = this.shopName;
  receiptComps["address"] = this.address;
  receiptComps["phone"] = this.phone;
  receiptComps["purchs"] = createPurchList(this.basket,this.prices, this.INVOICEITEMCHARLENGTH,"purchsListForReceipt");
  receiptComps["grossTotal"] = align(this.spendAmtBeforeDiscount, this.INVOICEITEMCHARLENGTH, "Total");
  if (this.genDiscAmt>0){
    receiptComps["basicDiscount"] = align(this.genDiscAmt, this.INVOICEITEMCHARLENGTH, `General ${this.discounts["general"]}% discount`);
  }
  receiptComps["totalTax"] = align(this.totalTax, this.INVOICEITEMCHARLENGTH, `Tax at ${this.taxPercent}%`);
  receiptComps["grandTotal"] = align(this.totalOwed, this.INVOICEITEMCHARLENGTH, "Total:");
  receiptComps["cash"] = align(this.cashTendered, this.INVOICEITEMCHARLENGTH, "Cash:");
  receiptComps["change"] = align(this.changeOwed, this.INVOICEITEMCHARLENGTH, "Change:");
  return receiptComps;
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
