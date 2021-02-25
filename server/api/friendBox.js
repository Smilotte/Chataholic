var express = require('express');
var Friendbox = require('../models/friendBox');

var router = express.Router();

router.get('/', (req, res) => {
    var parms = req.query.UserId;
    Friendbox.retrieveAll( parms,(err, result) => {
        if (err) {return res.send(err);}
        else{
            return res.json({data:result});
        }
    });
});

module.exports = router;
