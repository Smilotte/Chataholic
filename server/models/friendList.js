const db = require('../database');

class Friendlist {

    static retrieveAll(parms,callback) {
        db.query('SELECT RoomId, UserId, Username FROM (SELECT RoomId, UserId FROM c10_friends.RoomUser WHERE RoomId IN (SELECT RoomId FROM c10_friends.RoomUser WHERE UserId = ?) AND NOT UserId = ?) d JOIN c10_friends.User USING (UserId);'
            ,[parms,parms], (err, res) => {
                if (err) {
                    return callback(err);
                }
                return callback(res);
            });
    }

    static delete(parms,callback) {
        db.query('DELETE FROM c10_friends.Chatroom WHERE RoomID = ?',[parms], (err, res) => {
            if (err) { return callback(err);}
            return callback(res);
        });
    }
}
module.exports = Friendlist;
