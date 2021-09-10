const db = require('../database');

class Friendbox {

    static retrieveAll(parms, callback) {
        db.query('SELECT Nickn FROM c10_friends.Profile WHERE UserId =?', [parms], (err, res) => {
            if (err) {
                return callback(err)
            }
            ;
            return callback(res);

        });
    }
}
module.exports = Friendbox;