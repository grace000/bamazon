var config = require('./config.js');
var mysql = require("mysql");
var dbConnection = mysql.createConnection(config);

var ShowItems = require('./showItems.js');
var inquirer = require("inquirer");

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

    ShowItems();
    

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