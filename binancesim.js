const fastify = require('fastify')({
  logger: false
})

var hrstart = process.hrtime();
var minDelay = 500; //Min exec time for API simulation
var maxDelay = 8000; //Max exec time for API simulation
var delay = 0;

fastify.post("/api/orders", (request, reply) => {
  //Set random Delay between minDelay and maxDelay
  delay = minDelay + Math.floor(Math.random() * (maxDelay - minDelay));
  var start = new Date();
  var order = request.body;
  try {
    var jsonorder = JSON.parse(order);
  } catch (error) {
    console.log(error);
  }
  hrstart = process.hrtime(); //Set start time to current processor tick time
  //Console log color blue
  console.log('\x1b[34m' + '---processing Order:' + jsonorder.orderid + ' webhook:' + jsonorder.webhook + ' received at:', start.getMilliseconds() + '\x1b[0m');
  console.log('   Waiting %d milliseconds', delay);
  console.log('---');
  sleep(delay).then(function (resp) {
    //Console log color cycan
    var end = new Date() - start;
    console.log('\x1b[36m' + 'Order:' + jsonorder.orderid + ' for webhook ' + jsonorder.webhook + ' Complete:' + ' completed after: %dms' + '\x1b[0m', end);
    hrend = process.hrtime(hrstart); //Elapsed processor tick time since start
    console.log('   Order ' + jsonorder.orderid + ' for webhook ' + jsonorder.webhook + ' Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    //reply.send(order + " sent order after :" + new Date() - start)});
    var returnObj = { Order: jsonorder.orderid, ExecTime: hrend[1] / 1000000, Webhook: jsonorder.webhook };
    reply.send(JSON.stringify(returnObj))
  });
})

fastify.listen(3002, (err, address) => {
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    //Console log start message in green
    console.log('\x1b[32m%s\x1b[0m', '------Binance Simulator Listening for orders on ' + address + '------');
    console.log(' ');
  }
})

function sleep(mill) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, mill);
  });
}

