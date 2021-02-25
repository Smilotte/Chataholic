var express = require('express');
var Profile = require('../models/profile');

var router = express.Router();

router.get('/', (req, res) => {
    var parms = req.query.UserId;
    Profile.retrieveAll( parms,(err, result) => {
        if (err) {return res.send(err);}
        else{
            return res.json({data:result});
        }
    });
});

router.post('/amend', (req, res) => {
    var parms = req.body.params;
    Profile.amend( parms,(err, result) => {
        if (err) {return res.send(err);}
        else{
            return res.json({data:result});
        }
    });
});

router.post('/addTest', (req, res) => {
    var parms = req.body.params;
    Profile.addTest(parms,(err, result) => {
        if (err) { return res.send(err); }
        else {
            return res.json({data:result});
        }
    });
});


//   router.post('/addTest', (req, res) => {
//     var parms = [req.body.userid, req.body.per];

//     if (!Array.isArray(parms)) {
//         return res.json({ data: `Argument must be in array format` });
//     }

//     if (!parms[0]) {
//         return res.json({ data: `Tester ID cannot be empty` });
//     }

//     Profile.addOrUpdatePer(parms, (err, result) => {
//         if (err) { return res.send(err); }
//         return res.json({ data: result });
//     });
// });


module.exports = router;
