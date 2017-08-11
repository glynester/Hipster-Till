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


})



// describe Shop do
//   context 'Shop initialization and setup' do
//     it 'initializes with a set format json file' do
//       shop = Shop.new("./spec/test.json")
//       expect(shop.shopname).to eq("Test Company")
//     end
