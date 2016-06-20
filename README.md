# Credit Card Check App
This is just a basic mock up app that validates credit card input.

# Functionality
A client server app. Server is in [nodejs](https://nodejs.org/en/) using [express](http://expressjs.com/) web framework.

After running server locally (see How to run? section), once you open the app, you will see a credit card detail form. Upon submit it validates the input in the client side and if all input validations are ok it does a asynchronous request to server for credit card number check.

Server validates credit card number and returns isValid = ('true' || 'false' ) and Card type = ('Visa'||'Master Card'||'American Express'||'UnKnown')

# How to run?.
1. Clone the repository

  ```bash
  $> git clone https://github.com/anoopmundathan/cc-check-app.git
  $> cd cc-check-app
  $> npm install
  $> node server
  ```
  
2. Open a browser and visit
  ```bash
  localhost:3000
  ```
# Reference
 [Luhn_algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)
 
# External Libraries
 [jQuery](https://jquery.com/)
 [Bootstrap](http://getbootstrap.com/)
