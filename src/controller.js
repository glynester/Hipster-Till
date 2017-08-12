$(document).ready(function(){
  till = new Till();
  initialise();
  function initialise(){
    var menuObj = till.prices;
    var sel = $('#menuItems');
    for(var prop in menuObj){
      sel.append($("<option>").attr('value',menuObj[prop]).text(`${prop} (£${menuObj[prop].toFixed(2)})`));
    }

  }

  $('#btnGenRecpt').click(function(){
    createRect();
  })

  function createRect(){
    $('#receipt').append($("<p>").text(`${till.createRectHeader()}`));
    $('#receipt').append($("<p>").text(`${till.shopName}`));
    $('#receipt').append($("<p>").text(`${till.address}`));
    $('#receipt').append($("<p>").text(`phone: ${till.phone}`));
  }

});
