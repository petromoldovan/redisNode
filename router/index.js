module.exports = function(app, client) {
  app
    .get('/', function(req, res, next) {
      res.send({success: true})
    })
    .get('/get-item/:id', function(req, res, next) {
      const id = req.params.id;

      client.hgetall(id, function(err, obj){
        if (!obj) {
          return res.send({error: 'Item does not exist'});
        }

        return res.send({item: obj})
      })
    })
    .post('/new', function(req, res, next) {
      const id = req.body.id;
      const name = req.body.name;
      const quantity = req.body.quantity;

      //create redis entry
      client.hmset(id, [
        'name', name,
        'quantity', quantity
      ], function(err, reply) {
        if(err) {
          return console.log(err);
        }
        console.log(reply);
        res.redirect('/');
      })
    })


    .get('/redis-session', function(req, res, next) {
      //set value to redis session
      req.session.email1 = "some@gmail.com1"

      //get value from redis session
      res.send(req.session.email1)
    })
    .get('/logout', function(req, res, next){
      req.session.destroy(function(err) {
        if (err) {
          return console.log(err);
        }

        return res.redirect('/');
      })
    })
}
