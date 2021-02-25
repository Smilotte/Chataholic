var express = require('express');
var Friendlist = require('../models/friendList');
var router = express.Router();
router.get('/', (req, res) => {
    var parms = req.query.UserId;
    Friendlist.retrieveAll( parms,(err, result) => {
        if (err) {return res.send(err);}
        else{
            return res.json({data:result});
        }
    });
});

router.post('/delete', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    var parms = req.body.RoomId;
    Friendlist.delete(parms,(err, result) => {
        if (err) {return res.send(err);}
        else{
            return res.json({data:result});
        }
    });
});

module.exports = router;
