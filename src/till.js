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
  this.phone = "16503600708";
  this.prices = {"Cafe Latte": 4.75, "Flat White": 4.75,  "Cappucino": 3.85,  "Single Espresso": 2.05,
    "Double Espresso": 3.75,  "Americano": 3.75,  "Cortado": 4.55,  "Tea": 3.65,
    "Choc Mudcake": 6.40,  "Choc Mousse": 8.20,  "Affogato": 14.80,  "Tiramisu": 11.40,
    "Blueberry Muffin": 4.05,  "Chocolate Chip Muffin": 4.05,  "Muffin Of The Day": 4.55};
  //++++++++++++++++++++++++++++++++++++++++
  this.discountTable = {};
  this.basket = [];
  this.receipt = [];
  this.generalDiscount = 0;
  this.generalDiscountAmt = 0;
  this.spendAmtBeforeDiscount = 0;
  this.spendAmtAfterDiscount = 0;     // Not yet used!
  this.totalTax = 0;
  this.totalOwed = 0;

}

Till.prototype.addItem = function(item){
  if (!this.prices[item]) return false;
  this.basket.push(item);
}

Till.prototype.calcBasicTotal = function(){
  this.spendAmtBeforeDiscount = this.basket.map(v=>this.prices[v]).reduce((tot,item)=>{
    return tot + item;
  });
  this.spendAmtBeforeDiscount = Math.round(this.spendAmtBeforeDiscount*100)/100;
}

Till.prototype.do_search = function(){
}
