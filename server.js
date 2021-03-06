
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: 'hooray! wellcome to our api!'});
});

var Contato     = require('./models/contato');
var Operadora   = require('./models/operadora');

// Routes

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


// Operadoras routes
router.route('/operadoras')
  // create operadora
  .post(function(req, res) {
    var operadora = new Operadora();
    operadora.name = req.body.name;
    operadora.code = req.body.code;
    operadora.category = req.body.category;

    operadora.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'Operadora criada!'});
    });
  })

  .get(function(req, res) {
    Operadora.find(function(err, operadoras) {
      if (err)
        res.send(err);

      res.json(operadoras);
    })
  });

router.route('/operadora/:operadora_id')
  
  // get one operadora
  .get(function(req, res) {
    Operadora.findById(req.params.operadora_id, function(err, operadora) {
      if (err)
        res.send(err);

      res.json(operadora);
    })
  })

  // update a contato
  .put(function(req, res) {
    Operadora.findById(req.params.operadora_id, function(err, operadora) {

      if (err)
        res.send(err);

      req.body.name ? operadora.name = req.body.name : null;
      req.body.code ? operadora.code = req.body.code : null;
      req.body.category ? operadora.category = req.body.category : null;

      operadora.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Operadora atualizada!' });
      });
    });
  })

  .delete(function(req, res) {
    Operadora.remove({
      _id: req.params.operadora_id
    }, function(err, operadora) {
      if (err)
        res.send(err);

      res.json({message: 'Operadora apagada!'})
    })
  });

// Contatos routes
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

      req.body.name ? contato.name = req.body.name : null;
      req.body.phone ? contato.phone = req.body.phone : null;
      req.body.operator ? contato.operator = req.body.operator : null;
      req.body.date ? contato.date = req.body.date : null;

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
  });

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/angular_app');
