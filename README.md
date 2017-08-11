# Hipster-Till
Cash till simulation using javascript

```
<!-- load './lib/app.rb' -->
till = till.new("./spec/test.json")  
till.make_discount_table("Cafe Latte",4,"1/1/2016","N/A")  
till.make_discount_table("Americano",5,"15/11/2016","31/12/2016")  
till.make_discount_table("Blueberry Muffin",6,"N/A","1/6/2017")  
till.set_general_discount(50,5)  
till.add_item("Blueberry Muffin",6)  
till.add_item("Tea",4)  
till.add_item("Affogato",2)  
till.calculate_bill  
print till.show_receipt  
```


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
