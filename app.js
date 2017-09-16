const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const redis = require('redis');

const router = require('./router');

//redis client
const client = redis.createClient();
client.on('connect', function() {
  console.log('redis connected');
})

//set port
const PORT = 3000;

//initialize app
const app = express();
app.use(bodyParser.json({type: '*/*'}));

//log incoming request
app.use(morgan('combined'));

//set router
router(app, client);

//listen for requests
app.listen(PORT, function(){
  console.log('Server listening on:', PORT)
})
