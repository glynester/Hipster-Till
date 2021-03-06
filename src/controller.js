$(document).ready(function(){
  checkLocation();
  function checkLocation(){ // If file is not running on web server, redirect to a message page.
    var href = location.href;
    href=href.match(/([^\/]*)\/*$/)[1];
    if ((window.location.protocol == 'file:')&&(href=="index.html")){
      window.location.href = "NoServer.html";
    }
  }
  till = new Till();
  initialise();
  $('#appHeader').text(`${till.shopName}`)
  $('title').text(`${till.shopName} Cash Till`)
  function initialise(){
    var menuObj = till.prices;
    var sel = $('#menuItems');
    for(var prop in menuObj){
      sel.append($("<option>").attr('value',prop).text(`${prop} (£${menuObj[prop].toFixed(2)})`));
    }
    $('#messages').hide();
    $('#btnGenRecpt').attr("disabled",true);
    $('#btnAddCash').attr("disabled",true);
    $('#btnClearAll').attr("disabled",true);
  }


  function showMessage(){
    if (till.message[1] == 1){
      $('#messages').text(till.message[0]);
      $('#messages').show();
      till.message[1] = 0;
    } else if (till.message[1] == 0){
      $('#messages').text("");
      $('#messages').hide();
      till.message[0] = "";
    }

}

  $('#btnClearAll').click(function(){
    clearAll();
  })

  function clearAll(){
    till.reset();
    $('#messages').hide();
    $('#receipt').empty();
    $('#receipt').css({'padding':'0px'});         // Need to set programmatically or receipt padding will be visible.
    $('#cash').val("");
    $('#quantity').val("");
    $('#amtOwed').val("£0.00");
    $('#menuItems').val('');
    $('#cashReceived').val("£0.00");
    $('#changeDue').val("£0.00");
    $('#btnGenRecpt').attr("disabled",true);
    $('#btnAddCash').attr("disabled",true);
    $('#btnClearAll').attr("disabled",true);
  }

  $('#btnAddItem').click(function(){
    var item = $('#menuItems option:selected').val();
    var qty = $('#quantity').val();
    till.cashTendered = 0;                        //Allows more items to be added by resetting the cash amount received to zero.
    $('#btnGenRecpt').attr("disabled",true);
    $('#cash').val("");
    $('#cashReceived').val(`£${(till.cashTendered).toFixed(2)}`);
    $('#changeDue').val(`£${(parseFloat(till.cashTendered) - parseFloat(till.totalOwed)).toFixed(2)}`);
    $('#changeDue').val("£0.00");
    till.addItem(item,qty);
    till.calcBasicTotal();
    till.calcBasicDiscount();
    showMessage();
    if (till.anyItemsOrdered()){
      $('#btnAddCash').attr("disabled",false);
      $('#btnClearAll').attr("disabled",false);
    }
    if (till.message[0]==""){
      $('#menuItems').val('');
      $('#quantity').val("");
    }
    $('#amtOwed').text(`£${(parseFloat(till.spendAmtBeforeDiscount)-parseFloat(till.genDiscAmt)).toFixed(2)}`);
    $('#receipt').empty();
    var items = till.createInterimPurchList();
    $('#receipt').css({'width':`${till.CURRENTPURCHLISTWIDTH}px`});
    items.forEach(v=>{
      $('#receipt').append($("<pre>").text(v));
    })
  })

  $('#btnGenRecpt').click(function(){
    createRect();
    showMessage();
  })

  function createRect(){
    var recItems = till.createRectHeader();
    if (!recItems) return false;
    $('#receipt').empty();
    $('#receipt').css({'width':`${till.RECEIPTWIDTH}px`});
    $('#receipt').css({'padding':'10px'});        // Need to set programmatically or receipt padding will be visible.
    $('#receipt').append($("<img>").attr("src","images/cup.png"));
    for (var v in recItems){
      if (v=="purchs"){
        recItems[v].forEach(i=>{
          $('#receipt').append($("<pre>").text(i));
        })
      } else {
        $('#receipt').append($("<pre>").text(`${recItems[v]}`));
      }
    };
    $('#receipt').append($("<img>").attr("src","images/thanks.png"));
  }

  $('#btnAddCash').click(function(){
    var cash = $('#cash').val();
    till.tenderCash(cash);
    showMessage();
    if (till.cashTendered != 0){
      $('#btnGenRecpt').attr("disabled",false);
      $('#cashReceived').val(`£${till.cashTendered}`);
      $('#changeDue').val(`£${(parseFloat(till.cashTendered) - (parseFloat(till.spendAmtBeforeDiscount)-parseFloat(till.genDiscAmt))).toFixed(2)}`);
    }
  })

});
