Some code to test Fastify and asynchrounous web hook handling and call back timing

Step 1. git pull the repo 

Step 2. npm init to install latest dependencies

Step 3. Start index.js in one terminal:  $node index.js
  you will see the fillowing on the terminal: ------Webhook API endpoint for calls on http://127.0.0.1:3000------
  
Step 4. Start binancetest.js in another terminal: $node binancesim.js
  you will see the following on terninal : ------Binance Simulator Listening for orders on http://127.0.0.1:3002------
  
Step 5. In 3rd Terminal run curl command: $ curl http://localhost:3000/api/mywebhook 

