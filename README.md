# Async Weebhooks and Fastify

Some sample application code to test Fastify and asynchrounous web hook handling and call back timing.
Code simulates a webhook API call inbound. The main index.js app then in turn makes a number or async outbound HTTP Posts to simulated trading endpoint. Each end point will take a random amount of time between minDelay and maxDelay.

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn or NPM installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.9.1

    $ npm --version
    7.21.1

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/Crypto69/webhooktesting.git
    $ cd webhooktesting
    $ npm update

## Running the project

  ###Start index.js in one terminal:  
  
  $ node index.js
  
  ##you will see the fillowing on the terminal:
  
  $ ------Webhook API endpoint for calls on http://127.0.0.1:3000------
  
  ###Start binancetest.js in another terminal: 
  
  $ node binancesim.js
  
  ##you will see the following on terninal : 
  
  $ ------Binance Simulator Listening for orders on http://127.0.0.1:3002------
  
  ##In a 3rd Terminal run curl command: 
  
  $ curl http://localhost:3000/api/mywebhook 

  ![alt text](https://github.com/Crypto69/webhooktesting/blob/bd27e2bf6e5b7206c9e29d36afc6319355c373ff/images/curl%20terminal.png?raw=true)

  After running this command you should see output appear in the terminal from Step 3 and Step 4

 ## In the terminal you run index.js you will see

  ![alt text](https://github.com/Crypto69/webhooktesting/blob/bd27e2bf6e5b7206c9e29d36afc6319355c373ff/images/index%20terminal.png?raw=true)

 ## In the terminal you run binancetest.js you will see

  ![alt text](https://github.com/Crypto69/webhooktesting/blob/bd27e2bf6e5b7206c9e29d36afc6319355c373ff/images/binancesim%20terminal.png?raw=true)

