var config = require('./config.js');
var mysql = require("mysql");
var dbConnection = mysql.createConnection(config);

// var ShowItems = require('./showItems.js');
var inquirer = require("inquirer");

dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("connection successful!");
  // makeTable();
});

// Create a "Prompt" with a series of questions.
inquirer.prompt([

  // Here we create a basic text prompt.
  {
    type: "input",
    message: "HI! What is your name?",
    name: "name"
  },

  // Here we give the user a list to choose from.
  {
    type: "list",
    message: "Welcome! Would you like to view Bamazon items?",
    choices: ["Yes, please!", "No thanks"],
    name: "activityOption"
  },

// we store all of the answers into a "user" object that inquirer makes for us.
]).then(function(user) {

  // If the user confirms, we displays the user's name and pokemon from the answers.
  if (user.activityOption === "Yes, please!") {

    console.log("==============================================");
    console.log("");
    console.log(user.name + " is ready to view items.");
    console.log("");
    console.log("==============================================");

    // showItems();
  
    var makeTable = function() {
    dbConnection.query("SELECT * FROM products", function(err, res) {
      for(var i = 0; i < res.length; i++){
        console.log(res[i].id + "|| " +res[i].product_name+ "||"+
          res[i].department_name+ "||"+res[i].price+ "||"+res[i].stock_quantity +"\n");
      }
    })
  }
    makeTable();

  // If the user does not confirm, then a message is provided and the program quits.
  }

  else {

    console.log("");
    console.log("");
    console.log("That's okay " + user.name + ", see you later!");
    console.log("");
    console.log("");

  } 

});