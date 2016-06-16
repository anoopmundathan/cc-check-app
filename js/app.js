"use strict";

var CCCheckApp = {};

$(document).ready(function() {

	// When submit button is clicked perform form validation
	$('#submitButton').click(function(e) {
		e.preventDefault();
	
		// Iterate each input element inside <form> tag
		$('#credit-card-form div').children('input').each(function(i,el) {

			// Store the value if input text is not blanks
			if ($(el).val() !== '') {
				CCCheckApp[el.id] = $(el).val();
			}
	
		});	
	});
});