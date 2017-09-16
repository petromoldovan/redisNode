const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const router = require('./router');

//initialize app
const app = express();

//redis client
const client = redis.createClient();
client.on('connect', function() {
  console.log('redis connected');
})

app.use(session({
  secret: 'ssshhhhh',
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
  saveUninitialized: false,
  resave: false
}));

//set port
const PORT = 3000;


app.use(bodyParser.json({type: '*/*'}));

//log incoming request
app.use(morgan('combined'));

//set router
router(app, client);

//listen for requests
app.listen(PORT, function(){
  console.log('Server listening on:', PORT)
})
