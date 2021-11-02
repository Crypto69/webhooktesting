var http = require('http');
var hrstart = process.hrtime();
const fastify = require('fastify')({
  logger: false
})
const no_orders = 4; //No of simulated post calls to API to make
var callcount = 0; //Count number of times webhook is called
var target = {
  host: 'localhost',
  port: 3002,
  path: '/api/orders'
};

fastify.get('/api/mywebhook', async (request, reply) => {
  reply.type('application/json').code(200)
  callcount+=1;
  totalTimeStart = process.hrtime();
  console.log('');
  // console log magenta color
  console.log('\x1b[35m%s\x1b[0m','Webhook Call:' + callcount)
  for (let i = 1; i <= no_orders; i++) {
    hrstart = process.hrtime(); //Get processor start tick time
    var elapsed = process.hrtime(totalTimeStart);
    //console log yellow color
    console.warn('\x1b[33m---About to call outbound API %d for webhook %d at : Elapsed: %ds %dms\x1b[0m',callcount, i, elapsed[0], elapsed[1] / 1000000);
    //http.request(target, callback).end();
    try {
      SendMsg(makeMsg(i));
    } catch (error) {
      console.log(error);
    }

    hrend = process.hrtime(hrstart); //Get processor elapsed tick time
    console.log('   Order Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    elapsed = process.hrtime(totalTimeStart);
    console.log('   Outbound API call %d done after : Elapsed: %ds %dms', i, elapsed[0], elapsed[1] / 1000000);
  }
  totalTimeEnd = process.hrtime(totalTimeStart); //Get elapsed time since start of webhook call
  var ExecTimeText = `Sent all ${no_orders} orders after (hr): ${totalTimeEnd[0]}s  ${totalTimeEnd[1] / 1000000}ms`;
  //console log magenta 
  console.log('\x1b[35m%s\x1b[0m',ExecTimeText);
  return { ordercomplete: 'true', ordertime: ExecTimeText }
})

fastify.listen(3000, (err, address) => {
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    //Console log start message in green
    console.log('\x1b[32m%s\x1b[0m', '------Webhook API endpoint for calls on ' + address + '------');
    console.log('');
  }
  // Server is now listening on ${address}
})

//make a test json object to pass in post message
function makeMsg(aNum) {
  var obj = { orderid: aNum, exch: "BIN" + aNum, Order: "Market", GF: aNum, pair: "BTCUSD", REF: aNum,webhook:callcount };
  return obj
}

//Make an http post to the target host with fake json
function SendMsg(msg) {
  var post_data = JSON.stringify(msg);
  //console.log('post data:' + post_data);
  var post_options = {
    host: target.host,
    port: target.port,
    path: target.path,
    agent: false,
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Length': post_data.length,
      "connection": "close"
    }
  };
  const post_req = http.request(post_options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      //console log cyan color
      console.log('\x1b[36m%s\x1b[0m','returned data:' + data);
      try {
        console.log(JSON.parse(data));
      } catch (error) {
        console.log(error);
      }
    });

  }).on("error", (err) => {
    console.log("Error: ", err.message);
  });
  post_req.write(post_data);
  post_req.on('error', function (e) {});
  post_req.end();
}

