var fs = require("fs");

// basicCardCon will accepts a question and answer
exports.basicCardCon = function(question, answer) 
{

	this.file = "questions.txt";
	this.front = question;
	this.back = answer;

	// newEntry will create a text file called questions.txt and append
	// question and answer entries to the file.
	this.newEntry = function() {
		fs.appendFile(this.file, JSON.stringify({
			front: this.front,
			back: this.back

		}) + "\n", function(error) {
			if(error){ console.log("error appending")}
		});
	};
	// getFile will retrieve all the questions and answers in in JSON format
	// while also setting a callback to use the data once the asynchronous call 
	// is completed
	this.getFile = function(callback) {

		fs.readFile(this.file, "utf8", function(error, data) {
				if(error){
					console.log("error reading file");
				}
				var records = data.split('\n');
				var userObj = [];
				
						// console.log(records);
				for (var i = 0; i < records.length; i++) {
					if (records[i].length > 0) {
					
						userObj.push(JSON.parse(records[i]));
					}
				}
				callback(userObj);

		}); // ends fs.readFile function
	} // ends function with callback argument

}; // ends basicCardCon constructor