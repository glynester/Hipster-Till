describe ("till",function(){
  var till;

  beforeEach(function(){
    till = new Till();    // Change this when json problem is resolved!
  });

  it ("should initialise properly", function(){
    expect(till.shopName).toEqual("The Coffee Connection");
    expect(till.address).toEqual("123 Lakeside Way");
    expect(till.prices["Blueberry Muffin"]).toEqual(4.05);
  });

  it ("should add an item to the basket", function(){
    till.addItem("Choc Mudcake");
    expect(till.basket[0]).toEqual("Choc Mudcake");
  });

  it ("should allow multiple items to be added to the basket", function(){
    till.addItem("Choc Mudcake");
    till.addItem("Choc Mudcake");
    till.addItem("Chocolate Chip Muffin");
    expect(till.basket[2]).toEqual("Chocolate Chip Muffin");
  });

  it ("should not allow a non-menu item to be added to the basket", function(){
    till.addItem("Maccaroni Cheese");
    expect(till.basket.length).toEqual(0);
  });

  it ("should calculate a basic total cost of items ordered", function(){
    till.addItem("Cappucino");
    till.addItem("Affogato");
    till.addItem("Cortado");
    till.calcBasicTotal();
    expect(till.spendAmtBeforeDiscount).toEqual(23.2);
  })


})



// describe Shop do
//   context 'Shop initialization and setup' do
//     it 'initializes with a set format json file' do
//       shop = Shop.new("./spec/test.json")
//       expect(shop.shopname).to eq("Test Company")
//     end
