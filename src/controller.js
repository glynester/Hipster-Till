$(document).ready(function(){
  till = new Till();
  initialise();
  function initialise(){
    // till.prices; // Create dropdown listing of menu items and prices.
    // console.log("initialising...");
    var menuObj = till.prices;
    var sel = $('#menuItems');
    for(var prop in menuObj){
      sel.append($("<option>").attr('value',menuObj[prop]).text(`${prop} (£${menuObj[prop]})`));
    }

  }

});
