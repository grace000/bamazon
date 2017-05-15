
var config = require('./config.js');
var mysql = require("mysql");
var dbConnection = mysql.createConnection(config);
var inquirer = require("inquirer");


var ShowItems = function() {
    	dbConnection.query("SELECT * FROM products", function(err, results) {
    		if (err) throw err;
    		//prompt user for id of item they want to buy, and how many of that item
	        

	        inquirer.prompt([
	        	{
	                name: "item_selection",
	                type: "input",
	                message: "What is the ID of the item you would you like to buy?"
	            }, {
	                name: "units",
	                type: "input",
	                message: "Enter how many units of this product you would like to buy"
	            }
	        ]).then(function(answer) {
	        	//get the info about what item the user picked
	        	var chosenItem;
      			for (var i = 0; i < results.length; i++) {
        			if (results[i].id == answer.item_selection) {
          				chosenItem = results[i];
        			}
        			//console.trace(chosenItem);
      			} // end for loop
      			if (chosenItem.stock_quantity < parseInt(answer.units) || chosenItem.stock_quantity == 0) {
      				console.log("Insufficient quantity! There's only " + chosenItem.stock_quantity + " " + chosenItem.product_name + " available. Please try again.");
                    ShowItems();
      			}
      			else {
      				//update stock amount
      				var newStockAmount = chosenItem.stock_quantity - answer.units;
      				dbConnection.query("UPDATE products SET ? WHERE ?", [{
          				stock_quantity: newStockAmount
        				}, {
          				id: chosenItem.id
        			}], function(error) {
          				if (error) throw err;
          				console.log("Stock Updated");
        			});
      				//calculate and tell user their total cost
      				var totalCost = (answer.units*chosenItem.price);
      				console.log("The total cost of your order is: $" + totalCost + "   Thanks for your order!");
      				ShowItems();
      			}
	        }) // end .then function
	    }) // end connection.query
    } // end ShowItem function

module.exports = ShowItems;