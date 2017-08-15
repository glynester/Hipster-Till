# Hipster-Till
Cash till simulation using javascript

## Technology
Built using javacript and jquery following a MVC pattern.  
A javacript framework was not used.  

## Without web interface
```
var till = new Till("./files/hipstercoffee.json");               // Not yet working
var till = new Till(); 
till.addItem("Blueberry Muffin",6);  
till.addItem("Tea",4);  
till.addItem("Affogato",2);  
till.calculate_bill;  
print till.show_receipt;  
```
## With web interface
Click on the dropdown list next to the "Add Item" button.  
Enter a quantity in the box to the right of that.  
Click the "Add Item" button to add the item as a purchase.  
The item added will appear in a summary list below showing item, quantity, price and total.  
Continue to add items as appropriate.  
When you have finished, enter a cash received amount in the box to the right of the "Cash Received" button.  
Click the "Cash Received" button to enter the cash received.  
Click the "Generate Receipt" button to display the receipt.  
Once the receipt has been generated, further items can be added or the amount of cash received can be changed.  

NOTES
The system will prevent invalid entries from being made.  
Buttons are only active when it is appropriate to click them in the process. Before that they are disabled.
Any error message will display at the top.  
Once the receipt has been generated, further items can be added or the amount of cash received can be changed.  



Till tech test
==============

We want to sell tills to a local hipster coffee shop who are finally embracing the 21st century. We need a new till to replace their vintage machines - unfortunately, hipster staff are too cool to learn a new system, so we need you to build something that they will understand.

Specification
-------------

This is what a sample receipt looks like:

![a receipt](../images/receipt.jpg)


Version 1
---------

Implement a system that contains the business logic to produce receipts similar to this, based on a `json` price list and test orders. A sample `.json` [file](hipstercoffee.json) has been provided with the list of products sold at this particular coffee shop.

Here are some sample orders you can try - whether you use this information is up to you:

> **Jane**  
> 2 x Cafe Latte  
> 1 x Blueberry Muffin  
> 1 x Choc Mudcake  
>
> **John**  
> 4 x Americano  
> 2 x Tiramisu  
> 5 x Blueberry Muffin  

Your receipt must calculate and show the correct amount of tax (in this shop's case, 8.64%), as well as correct line totals and total amount. Do not worry about calculating discounts or change yet. Consider what output formats may be suitable.

Version 2
---------

- Add functionality to take payment and calculate correct change.  
- Add functionality to handle discounts - in this example, a 5% discount on orders over $50, and a 10% muffin discount.

Version 3
---------

Implement a user interface that can actually be used as a till.

You may use whatever technologies you see fit.
