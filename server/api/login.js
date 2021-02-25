var express = require('express');
var Login = require('../models/login');

var router = express.Router();

router.get('/', (req, res) => {
  Login.retrieveAll((err, result) => {
    if (err) {return res.send(err);}
    else{ 
        return res.json({data:result});
    }
  });
});

router.get('/authenticate', (req, res) => {
    var parms = [req.query.Username,req.query.Password];

    Login.authenticate( parms,(err, result) => {
      if (err) {return res.send(err);}
      else{ 
        return res.json({data:result});
      }
    });
  });

router.post('/regUser', (req, res) => {
  var parms = [req.body.Username, req.body.Password];
  if(!req.body.Username || !req.body.Password){
      return res.json({ data: `Parameter cannot be empty` });
  }

  Login.regUser(parms, (err, result) => {
        if (err) { return res.send(err); }

        return res.json({ data: result });
    });
});

module.exports = router;