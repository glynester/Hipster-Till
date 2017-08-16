# Hipster-Till
Cash till simulation for a coffee shop using data supplied as a json file (see json format in Appendix 1)

# Full Requirement
See "Till tech test" below:

# Technology
Built using Javacript and JQuery following a MVC pattern.  
A Javacript development framework was not used.  
Used TTD and tests were written using Jasmine.  

# Using the Program
## Without web interface
Load index.html into a browser on a server (see "Running a webserver in UBUNTU" below).  
In the developer console, type the following:
```
Create the till:  
var till = new Till();  // Will default to using the file "hipstercoffee.json" in the files folder.  
or use the second sample file:  
var till = new Till("./files/unhipcoffee.json");       // Specify non default JSON file in the files folder.
or load a json file from another location:  
var till = new Till("./location/yourfilename");       // Specify another JSON file you have uploaded to another location.  
Add an item:  
till.addItem("Blueberry Muffin",6);  
till.addItem("Tea",4);  
till.addItem("Affogato",2);  
Receive cash:  
till.tenderCash(100);  
Create the receipt:  
console.log(till.createRectHeader());   // Creates an object containing all receipt elements.  
Show how much change is due:  
console.log(till.changeOwed);  
```
## With web interface  
Load index.html into a browser on a server (see "Running a webserver in UBUNTU" below).  
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


# Running a webserver in UBUNTU
If you try and run the website from a local file system you will get a "Cross origin request" error when you try and access the JSON file. This is because brower security is much tighter around JS methods associated with local files.   
To get round this, you need to run this website on a webserver.  
To open a webserver in UBUNTU do the following:  
In terminal, navigate to the folder your files are in, e.g. "/course_projects/Hipster-Till".  
Type the following command to run a server "sudo python2 -m SimpleHTTPServer 80" or "sudo python3 -m http.server 80".  
Type localhost into a Chrome browser to open the website on the server.  
The website functionality should now work correctly.  

---
---

Till tech test
==============

We want to sell tills to a local hipster coffee shop who are finally embracing the 21st century. We need a new till to replace their vintage machines - unfortunately, hipster staff are too cool to learn a new system, so we need you to build something that they will understand.

Specification
-------------

This is what a sample receipt looks like:

![a receipt](images/receipt.jpg)


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

---
---

APPENDIX 1
----------
```
[
  {
    "shopName": "The Coffee Connection",
    "address": "123 Lakeside Way",
    "phone": "+1(650)360-0708",
    "prices": [
      {
        "Cafe Latte": 4.75,
        "Flat White": 4.75,
        "Cappucino": 3.85,
        "Single Espresso": 2.05,
        "Double Espresso": 3.75,
        "Americano": 3.75,
        "Cortado": 4.55,
        "Tea": 3.65,
        "Choc Mudcake": 6.40,
        "Choc Mousse": 8.20,
        "Affogato": 14.80,
        "Tiramisu": 11.40,
        "Blueberry Muffin": 4.05,
        "Chocolate Chip Muffin": 4.05,
        "Muffin Of The Day": 4.55
      }
    ]
  }
]
```
