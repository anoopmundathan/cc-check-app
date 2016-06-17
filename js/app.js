"use strict";

// Credit Card App Object
window.CCCheckApp = {

	/**
	 * This function validate credit card, invokes asyn request to server and get response.
	 * @parm {object} data
	 * @parm callback function
	 */
	 validateCreditCard: function(data, callback) {

		// API end point for credit card validation
		var url = 'http://localhost:3000/api/cc';

		/**
		 * Call  jQuery async request function
		 */
		$.ajax({
				url: url,

				type: 'POST',

				data: JSON.stringify(data),

				contentType: 'application/json',

				/**
 				 * Execute this fuction if async request is completed.
 				 */
				success: function(data) {

					console.log('Received response from server');
					
					if(typeof callback !== 'undefined'){
     					callback(data);
   					};
					
				},

			   /**
 				* Execute this function if async request failed.
 				*/
				error: function() {

					console.log('Something wrong with async request');

					if(typeof callback !== 'undefined'){
						callback({error:'true'});
   					}
				}
		});
	}
};

/**
 * Start the App
*/
$(document).ready(function() {

	// Register to click event
	$('#submitButton').click(function(e) {

		// Prevent default behaviour of button
		e.preventDefault();

		var data = {};   // Hold form data.
		var flag = true;  // Flag uses for form input

	   /**
        * Iterate through all input elements and retrieve the values.
        */
		$('#credit-card-form div').children('input').each(function(i,el) {

			// Store values into form data object
			if ($(el).val() !== '') {
				data[el.id] = $(el).val();
			}
			else {
				flag = false;  // If any input field is blank
			}
		});

		/**
		 * If all fields are entered, it is time to send request to the server
		 */
		if (flag) {

			$(".error").html('');

			// Make Async request to validate credit card
			CCCheckApp.validateCreditCard(data, function(response) {

				// If async request is failed. Display failed message.
				if (response.hasOwnProperty('error')){
					$(".msg-container").html('');
					$(".form-container").append('<div class="msg-container "><h4>Contacting server failed</h4></div>');
				} 
				// Display response
				else {
					$(".msg-container").html('');
					$(".form-container").append('<div class="msg-container"><h4>isValid:' + response.status +' Card Type: '+ response.type + '</h4></div>');
				}
				
			}); 
		}
		else // All fields needs to be filled
		{
			$(".msg-container").html('');
			$(".form-container").append('<div class="msg-container "><h4>Please enter all fields</h4></div>');
		}

	});

	/**
	 *  Input field validation
	 */

	// Limit credit card number length to 20 and do not allow hyphen & 'e'
	$('input[id="ccnumber"]').keypress(function(e) {
    	if ((this.value.length >= 20) || (e.keyCode == 45) || (e.keyCode == 101)) {
        	return false;
    	}
	});

	// Limit CSV number length to 3 and do not allow hyphen & 'e'
	$('input[id="csv"]').keypress(function(e) {
    	if ((this.value.length >= 3) || (e.keyCode == 45) || (e.keyCode == 101)) {
        	return false;
    	}
	});

	// Limit expiry month length to 2 and do not allow hyphen & 'e'
	$('input[id="expmonth"]').keypress(function(e) {
    	if ((this.value.length >= 2) || (e.keyCode == 45) || (e.keyCode == 101)) {
        	return false;
    	}
	});

	// Limit expiry year length to 4 and do not allow hyphen & 'e'
	$('input[id="expyear"]').keypress(function(e) {
    	if ((this.value.length >= 4)  || (e.keyCode == 45) || (e.keyCode == 101)) {
        	return false;
    	}
	});

});
