const db = require('../database');

class MessageModel  {
    static newMessage(content, senderId, rid) {
        return db.query('INSERT INTO c10_friends.Message (Content, SenderId, RoomId) VALUES (?,?,?)',
            [content, senderId, rid], (err, res) => {
                if (err) return err
            }
        )
    }

    static getHistoryByRoomId(rid) {
        return new Promise(resolve => {
            db.query('SELECT senderId, content FROM c10_friends.Message WHERE RoomId = ?', [rid], (err, res) => {
                debugger
                if (err) resolve(err)
                else resolve(res)
            })
        })
    }
};

module.exports = MessageModel;

