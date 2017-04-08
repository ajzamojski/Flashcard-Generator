var fs = require("fs");

// closeCardCon accepts the full answer and just the answer in the arguments
exports.closeCardCon = function(full, close) 
{
	this.file = "questionsClose.txt";
	this.close = close;
	this.full = full;

	// this.partial function will remove the close(answer) from the full text and replace
	// the text will ... and returning it in a variable
	this.partial = function() {
		var updateText = this.full.toLowerCase().replace(this.close.toLowerCase(), "...");
		return updateText;
	};

	// this.newEntry will save the entries in questionClose.txt file
	this.newEntry = function() {
		fs.appendFile(this.file, JSON.stringify({
			full: full,
			close: close,
			partial: this.partial()

		}) + "\n", function(error) {
			if(error){ console.log("error appending")}
		}); // ends fs.appendFile function
	}; // ends newEntry function
}; // ends closeCardCon function 