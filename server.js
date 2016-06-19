/**
 * Credit Card Check App - server.js
 */
 
"use strict";
 
// Include modules
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

app.post('/api/cc', function(req, res) {

      /**
	* Note: - Only credit card number is being validated
	* Expiry date, Expiry year, CSV is not being validated
	*/
	var CCApp = {};
	CCApp.number = req.body.ccnumber;   // Store credit card number from the request.  

   /**
    * Validates the credit card number using the Luhn10 algorithm.
    *
    * @param {Number} number Credit card number.
    * @returns {Boolean}
    * Credits: Online resources
    */
	CCApp.validateCC = function() {

		var sum = 0;
		var numdigits = this.number.length;
		var parity = numdigits % 2;

		for(var i=0; i < numdigits; i++) { 
    			var digit = parseInt(this.number.charAt(i));
    		  	if(i % 2 == parity) digit *= 2;   // Double every other digits
    		  	if(digit > 9) digit -= 9;  
    	 	  	sum += digit; 
    	       	}

 		return (sum % 10) == 0; 
	}

   /**
    * Find out the card type using card length and starting seq number.
    * 
    * @param {Number} number Credit card number.
    * @returns {String}
    */
	CCApp.findOutCardType = function() {
        
        var length = this.number.length;
        
		if ((/^(4)/.test(this.number)) && ((length == 13) || (length == 16) || (length == 19))) {
    			return 'Visa';
    		} else if ((/^3[47]/.test(this.number)) && (length == 15)) {
    			return 'American Express';
  		} else if ((/^5[1-5]/.test(this.number)) && (length == 16)) {
    			return 'MasterCard';
    		} else {
    			return 'Unknown';
    		}
	}

   /**
    * Send response to the client after credit card validation.
    * @returns {status, type} object
    */
	res.send({
		status: CCApp.validateCC(),
		type: CCApp.findOutCardType()
	});

});

/**
 * Start Listening request
 */
var port = 3000;
app.listen(port); 

console.log('Server is listening on port : ' + port );
