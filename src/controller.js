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
    var item = $('#menuItems option:selected').val();
    var qty = $('#quantity').val();
    till.addItem(item,qty);
    till.calcBasicTotal();
    till.calcBasicDiscount();
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
  })

  function createRect(){
    var recItems = till.createRectHeader();
    if (!recItems) return false;
    $('#receipt').empty();
    $('#receipt').css({'width':`${till.RECEIPTWIDTH}px`});
    $('#receipt').css({'padding':'10px'});    // Need to set programmatically or receipt padding will be visible.
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
  })

});
