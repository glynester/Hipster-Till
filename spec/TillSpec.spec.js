// NOTE: Needs to be run on a server or you will get a "Cross origin requests" error.

describe ("till",function(){
  var till;

  beforeEach(function(){
    till = new Till();
  });

  it ("should initialise properly", function(){
    expect(till.shopName).toEqual("The Coffee Connection");
    expect(till.address).toEqual("123 Lakeside Way");
    expect(till.prices["Blueberry Muffin"]).toEqual(4.05);
  });

  it ("should add an item to the basket", function(){
    till.addItem("Choc Mudcake",1);
    expect(till.basket[0]).toEqual(["Choc Mudcake",1]);
  });

  it ("should allow multiple items to be added to the basket", function(){
    till.addItem("Choc Mudcake",1);
    till.addItem("Americano",1);
    till.addItem("Chocolate Chip Muffin",2);
    expect(till.basket[2]).toEqual(["Chocolate Chip Muffin",2]);
  });

  it ("should not allow a non-menu item to be added to the basket", function(){
    till.addItem("Maccaroni Cheese",1);
    expect(till.basket.length).toEqual(0);
  });

  it ("should calculate a basic total cost of items ordered", function(){
    till.addItem("Cappucino",2);
    till.addItem("Affogato",2);
    till.addItem("Cortado",2);
    till.createRectHeader();
    expect(till.spendAmtBeforeDiscount).toEqual("46.40");
  });

  it ("should not apply the general discount if total cost < £50", function(){
    till.addItem("Cappucino",2);
    till.addItem("Affogato",2);
    till.addItem("Cortado",2);
    till.createRectHeader();
    expect(till.genDiscAmt).toEqual("0.00");
  });

  it ("should apply the general discount if total cost > £50", function(){
    till.addItem("Cappucino",2);
    till.addItem("Affogato",2);
    till.addItem("Cortado",2);
    till.addItem("Choc Mousse",3);
    till.createRectHeader();
    expect(till.genDiscAmt).toEqual("3.55");
  });

  it ("should apply the correct tax rate", function(){
    till.addItem("Blueberry Muffin",4);
    till.createRectHeader();
    expect(till.totalTax).toEqual("1.40");
  });

  it ("should calculate the correct overall total", function(){
    till.addItem("Tiramisu",4);
    till.addItem("Cafe Latte",5);
    till.createRectHeader();
    expect(till.totalOwed).toEqual("65.88");
  });

  it ("should return the correct change for cash tendered",function(){
    till.addItem("Cortado",3);
    till.createRectHeader();
    till.tenderCash(20.65);
    till.calcCashOwed();
    expect(till.cashTendered).toEqual("20.65");
    expect(till.changeOwed).toEqual("7.00");
  });

  it ("should not allow insufficient cash to be tendered",function(){
    till.addItem("Choc Mousse",15);
    till.createRectHeader();
    till.tenderCash(10);
    expect(till.cashTendered).toEqual(0);
  });

  it ("should not allow an invalid cash entry to be made",function(){
    till.addItem("Choc Mousse",5);
    till.createRectHeader();
    till.tenderCash("hello");
    expect(till.cashTendered).toEqual(0);
  });

});
