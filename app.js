/* This Flashcard app will allow user to make questions and answers
	that simulate a typical flashcard. The admin will allow you to
	make two types of cards: one with a question and the answer (Basic)
	while the other will have a statement with the whole answer but
	delete the portion with the answer in it while the user must 'fill'
	in the blank (closeCard)

*/

// This app requires the inquirer npm and the two constructor methods
var basicCard = require("./basicCard.js");
var closeCard = require("./closeCard.js");
var inquirer = require("inquirer");

//Creates two objects that reference the basicCard and closeCard constructors
var myUser = new basicCard.basicCardCon();
// var myUser2 = new closeCard.closeCardCon();

function Main () {
	//The main function first prompts what the person would like to do
    inquirer.prompt([
      {
      	type: "list",
        name: "name",
        message: "What is your login?",
        choices: ["Admin-Basic", "Admin-Close", "User"]
      },
      ]).then(function(response) {
      	//If the person chose Admin-Basic, they will be creating a basicCard question
      	// which will be added to a list of questions
      	if (response.name === "Admin-Basic") {
      		console.log("Edit new flashcard..");
      		//Inquirer asks for your question and checks the validity if question is left blank
      		inquirer.prompt([
      			{
		        name: "question",
		        message: "Type in your question",
		        validate: function validateFirstname(answer)
			        	{
			        		if (answer === '') {
			        			console.log('\n' + "Enter a value");
			        			return;
			        		}
			        		else return true;
			        	}
		    	}
		    	// Once a question has been typed in..
      			]).then(function(question) {
      				//The Admin user is asked to type in an answer also checking for validity
      				inquirer.prompt([ 
      				{
			        name: "answer",
			        message: "Type in your answer",
		       		validate: function validateFirstname(answer)
			        	{
			        		if (answer === '') {
			        			console.log('\n' + "Enter a value");
			        			return;
			        		}
			        		else return true;
			        	}			        
			   		}
			   		// Once a question has been typed in..
	      			]).then(function(response2) {
	      				// Creates an unique object using the basicCard constructor
	      				var inputedQuestion = new basicCard.basicCardCon(question.question, response2.answer);
	      				
	      				inputedQuestion.newEntry();
	      				console.log(inputedQuestion.front);
	      				console.log(inputedQuestion.back);

	      			}); // ends function with response2 argument

      			}); // ends function with question argument

      		} // ends if statement

      	//If the person chose Admin-Close, they will be creating a closeCard question
      	// which will be added to a list of questions. This is very similar to the 
      	// Admin-Basic with the exception of validity of checking the answer, see comment below
      	else if (response.name === "Admin-Close") {
      		console.log("Edit new flashcard..");
      		inquirer.prompt([
      			{
		        name: "question",
		        message: "Type in your question",
		        validate: function validateFirstname(answer)
			        	{
			        		if (answer === '') {
			        			console.log('\n' + "Enter a value");
			        			return;
			        		}
			        		else return true;
			        	}		        
		    	}
      			]).then(function(question) {

      				inquirer.prompt([ 
      				{
			        name: "answer",
			        message: "Type in your answer",
		        	validate: function validateFirstname(answer)
			        	{
			        		if (answer === '') {
			        			console.log('\n' + "Enter a value");
			        			return;
			        		}
			        		// If the answer is not included in the full text, it will not accept
			        		// the statement, making the closeCard invalid
			        		if (!question.question.toLowerCase().includes(answer.toLowerCase())) {
			        			console.log('\n' + "The answer must be included in the full statement");
			        			return;
			        		}
			        		else return true;
			        	}
			   		}
	      			]).then(function(response2) {
	      				// A unique object is created using the closeCard constructor
	      				var inputedQuestion = new closeCard.closeCardCon(question.question, response2.answer);
	      				inputedQuestion.newEntry()

						console.log(inputedQuestion.close);
				      	console.log(inputedQuestion.full);
	      				console.log(inputedQuestion.partial());

	      			}); // ends function with response2 argument 

      			}); // ends function with question argument

      		} // ends else if statement

      	// This else gets executed when user is chosen and displays the user a 
      	// question while the user must answer to see if they are correct or not
      	else {
      		// Unique basic card object calls to get data (all the questions and answers) 
      		// from the constructor function
      		myUser.getFile(function(data) {
      			var someItem = [];

      			// askQuestion function asks a question to the prompt using inquirer
				function askQuestion(data) 
				{
					// Inquirer prompts the user a random question from randItem function
					someItem = randItem(data);
      				inquirer.prompt([
      				{
      				type: "input",
			        name: "answer",
			        message: someItem.front,
			        validate: function validateFirstname(answer)
			        	{
			        		if (answer === '') {
			        			console.log('\n' + "Enter a value");
			        			return;
			        		}
			        		else return true;	 
			        	}
			    	}
      				]).then(function(response) {
      				// When an answer is typed in, the user will be notified if they are correct
      				// or not while also prompting for the next question until all questions
      				// are done.
      					if (response.answer.toLowerCase() === someItem.back.toLowerCase()) {

      						console.log(response.answer);
      						console.log("That is correct!");
      						if (data.length > 0) {
      						askQuestion(data);
      						}
      						else return console.log("Thats all the cards! Study again sometime!");
      					}
      					else {
      						console.log("Incorrect, the answer is: " + someItem.back);
      						if (data.length > 0) {
      							askQuestion(data);
      							}
      						else return console.log(" Thats all the cards! Study again sometime!");  
      						}

	      			}); // ends function with response argument

      			}; // ends function askQuestion
      			askQuestion(data);
      		}); // ends function callback getFile
      	} // ends else statement
      }); // ends function with response in argument on line 28
	}; // ends main

	// Function that accept the data with questions and answers which randomly
	// picks a question and answer, removes it from the array and then returns
	function randItem(arr) {  
	    var itemIndex = Math.floor(Math.random() * arr.length);
	    var itemValue = arr[itemIndex]
	    arr.splice(itemIndex,1);
	    return itemValue;
	};

Main();
