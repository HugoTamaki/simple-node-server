
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: 'hooray! wellcome to our api!'});
});

var Contato     = require('./models/contato');

// Routes

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/contatos')
  // create a contato
  .post(function(req, res) {
    var contato = new Contato();
    contato.name = req.body.name;
    contato.phone = req.body.phone;
    contato.operator = req.body.operator;
    contato.date = req.body.date;

    contato.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'Contato criado!'});
    });
  })

  // get all contatos
  .get(function(req, res) {
    Contato.find(function(err, contatos) {
      if (err)
        res.send(err);

      res.json(contatos);
    })
  });

router.route('/contatos/:contato_id')

  // get one contato
  .get(function(req, res) {
    Contato.findById(req.params.contato_id, function(err, contato) {
      if (err)
        res.send(err);

      res.json(contato);
    })
  })

  // update a contato
  .put(function(req, res) {
    Contato.findById(req.params.contato_id, function(err, contato) {

      if (err)
        res.send(err);

      contato.name = req.body.name;  // update the contato info
      contato.phone = req.body.phone;
      contato.operator = req.body.operator;
      contato.date = req.body.date;

      // save the bear
      contato.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Contato atualizado!' });
      });
    });
  })

  .delete(function(req, res) {
    Contato.remove({
      _id: req.params.contato_id
    }, function(err, contato) {
      if (err)
        res.send(err);

      res.json({message: 'Contato apagado!'})
    })
  })



app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/angular_app');


// HTTParty.put('http://localhost:8080/api/contatos/557cae0654d5940710000005', :body => {name: 'Eduardo'}.to_json, :headers => {'content-type' => 'application/json'})