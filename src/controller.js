$(document).ready(function(){
  till = new Till();
  initialise();
  function initialise(){
    var menuObj = till.prices;
    var sel = $('#menuItems');
    for(var prop in menuObj){
      sel.append($("<option>").attr('value',prop).text(`${prop} (£${menuObj[prop].toFixed(2)})`));
    }

  }

  $('#btnAddItem').click(function(){
    // console.log("Add item clicked!!!")
    var item = $('#menuItems option:selected').val();
    var qty = $('#quantity').val();
    // console.log(item,qty);
    till.addItem(item,qty);
  })

  $('#btnGenRecpt').click(function(){
    createRect();
  })

  function createRect(){
    var recItems = till.createRectHeader();
    console.log(recItems);
    // recItems.forEach(v=>{
    for (var v in recItems){
      // console.log(v);
      if (v=="purchs"){
        recItems[v].forEach(i=>{
          // $('#receipt').append($("<p>").text(`${i[0]} ${i[1]} x £${(i[2]).toFixed(2)}`));
          $('#receipt').append($("<pre>").text(i));
        })
      } else {
        $('#receipt').append($("<p>").text(`${recItems[v]}`));
      }
    };
    // $('#receipt').append($("<p>").text(`${till.createRectHeader()}`));
    // $('#receipt').append($("<p>").text(`${till.shopName}`));
    // $('#receipt').append($("<p>").text(`${till.address}`));
    // $('#receipt').append($("<p>").text(`phone: ${till.phone}`));
    // $('#receipt').append($("<p>").text(`${till.createPurchList()}`));
  }

});
