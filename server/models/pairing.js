const db = require('../database');

class Pairing {
    static retrieveAll (callback) {
        db.query('SELECT COUNT(UserId) AS online, UserId FROM c10_friends.User WHERE online="true"', (err, res) => {
            if (err) return callback(err);
            return callback(res);
        });
    }

    // static pairingUp (id, callback) {
    //   //with friends table use this one SELECT * FROM (SELECT U.UserId as id from User U, Profile P Where U.UserID = P.UserId AND U.UserId != 1 AND P.Personality = (SELECT Personality from Profile Pi WHERE Pi.UserID = 1)) F WHERE F.fid NOT IN (SELECT F.uid2 as id from Friends F WHERE F.uid1 = 1)
    //   db.query(`SELECT U.UserId as FID from User U, Profile P Where U.UserID = P.UserId AND U.UserId != '${id}' AND P.Personality = (SELECT Personality from Profile WHERE UserID = '${id}')`, function (err, res) {
    //     if (err) return callback(err);
    //     if (res.length !== 0) {
    //       return callback(res[Math.round(Math.random() * (res.length - 1))]);
    //     }
    //     else
    //       return callback({ msg: "No match was found" });
    //   })
    // }

    static pairingUp(id, callback) {
        db.query(`SELECT * FROM (SELECT U.UserId as id from User U, Profile P Where U.UserID = P.UserId AND U.UserId != ${id} AND P.Personality = (SELECT Personality from Profile Pi WHERE Pi.UserID = ${id})) F WHERE F.id NOT IN (
      SELECT R.UserId as id from RoomUser R WHERE R.RoomId in (SELECT RU.RoomId FROM RoomUser RU WHERE RU.UserId = ${id}))`, function(err, res) {
            if (err) return callback(err);
            if (res.length !== 0) {
                return callback(res[Math.round(Math.random() * (res.length - 1))]);
            }
            else
                return callback({ msg: "No match was found" });
        })
    }

    static addFriend(parms,callback){
        db.beginTransaction(function(err) {
            if (err) { return callback(err); }
            db.query('INSERT INTO c10_friends.Chatroom VALUES (null)', (err, res) => {
                if (err) {
                    return db.rollback(function() {
                        return callback(err);
                    });
                }

                var rid =  res.insertId;
                console.log("insert"+rid);

                db.query('INSERT INTO c10_friends.RoomUser (RoomId,UserId) VALUES (?, ?), (?, ?) ', [rid,parms[0],rid,parms[1]], (err, res) => {
                    if (err) {
                        return db.rollback(function() {
                            return callback(err);
                        });
                    }
                    console.log("insert Finish");
                    db.query('SELECT Username From c10_friends.User WHERE UserId =? ', [parms[1]], (err, res) => {
                        if (err) {
                            return db.rollback(function() {
                                return callback(err);
                            });
                        }
                        console.log("select finish");
                        db.commit(function(err) {
                            if (err) {
                                return db.rollback(function() {
                                    return callback(err);
                                });
                            }
                            console.log(res);
                            console.log(res[0].Username);
                            console.log('add friend success!');
                            return callback({room: rid, fdname: res[0].Username});
                        });
                    });
                });
            });
        });
    }


}

module.exports = Pairing;
