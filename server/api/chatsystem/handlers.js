const db = require('../../database');
const Manager = require("./roomManager");
module.exports = function (user) {

    const RoomManager = new Manager();
    //Initial chatrooms by user
    function initial(userId){
        user.id = userId;
        db.query('SELECT RoomId FROM c10_friends.RoomUser WHERE UserId = ?',[userId], (err,res) => {
            if (err) return err;
            else{
                res.forEach(e => {
                    RoomManager.addRoom(e.RoomId);
                    var room = RoomManager.getRoomById(e.RoomId);
                    room.addUser(user);
                    room.setHistoryDB();
                    console.log("initial end");
                }) ;
            }
        });
        console.log("Connected user:" +userId );
    }

    function setChatrooms(roomId){
        RoomManager.addRoom(roomId);
        var room = RoomManager.getRoomById(roomId);
        room.addUser(user);
        room.setHistoryDB();
        console.log("setChatrooms end");
    }

    function getHistoryHandler(rid){
        var room=parseInt(rid,10);
        console.log("getHistoryhandler roomId:"+ room);
        RoomManager.getRoomById(room).getChatHistory(user);
    }

    //Pass the message to the chatroom
    function handleMessage({rid, senderId, content} = {}) {
        var room=parseInt(rid,10);
        var sid=parseInt(senderId,10);
        RoomManager.getRoomById(room).broadcastMessage(sid,content);
    }

    function handlerClear(rid){
        var room=parseInt(rid,10);
        console.log("getHistoryhandler roomId:"+ room);
        RoomManager.getRoomById(room).clearChatHistory();
    }

    function handleDeleteRoom(rid){
        RoomManager.getRoomById(rid).deleteUser(user);
        RoomManager.removeRoom(rid);
    }

    //Remove user from all the chatroom
    function handleDisconnect() {
        db.query('SELECT RoomId FROM c10_friends.RoomUser WHERE UserId = ?',[user.id], (err,res) => {
            if (err) return err;
            else res.forEach(e => {
                RoomManager.getRoomById(e.RoomId).deleteUser(user);
                RoomManager.removeRoom(e.RoomId);
            })
        })
    }

    return {
        initial,
        handleMessage,
        handleDisconnect,
        setChatrooms,
        getHistoryHandler,
        handlerClear,
        handleDeleteRoom
    }
};
