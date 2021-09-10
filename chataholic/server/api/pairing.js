var express = require('express');
var Pairing = require('../models/pairing');

var router = express.Router();

router.get('/', (req, res) => {
    Pairing.retrieveAll((err, result) => {
        if (err) {return res.send(err);}
        else{
            return res.json({data:result});
        }
    });
});

router.get('/dopair', (req, res) => {
    const id = req.query.id;
    Pairing.pairingUp(id, (err, result) => {
        if (err) { return res.send(err); }
        else {
            return res.json({ data: result });
        }
    });
});


router.post('/addFriend', (req, res) => {
    var parms = [req.body.UserId, req.body.FriendId];
    Pairing.addFriend(parms,(err, result) => {
        if (err) {return res.send(err);}
        else{
            return res.json(result);
        }
    });
});



module.exports = router;
