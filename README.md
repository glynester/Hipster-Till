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
