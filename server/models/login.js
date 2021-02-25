const db = require('../database');

class Login {
  static retrieveAll (callback) {
    db.query('SELECT Username FROM c10_friends.User', (err, res) => {
      if (err) return callback(err);
        return callback(res);
    });
  }

  static authenticate (parms, callback) {
      var name = parms[0];
      var pw = parms[1];
    db.query('SELECT * FROM c10_friends.User WHERE Username =? AND Password =?', [name,pw], (err, res) => {
      if (err) {return callback(err)};
          return callback(res);
    
    });
  }

  static regUser(parms, callback) {
    var name = parms[0];
    var pw = parms[1];
    db.query('SELECT * FROM c10_friends.User WHERE Username =?', [name], (err, res) => {
        if (err) { return callback(err) };

        if (!res.length) {
            db.query('INSERT INTO c10_friends.User (Username, Password) VALUES(?,?)', [name, pw], (err, res) => {
                if (err) {
                    return callback(err)
                };

                if (res.insertId) {
                    return callback('200')
                }

            })
        } else {
            return callback(`User existence`);
        }
    });
}
}

module.exports = Login;