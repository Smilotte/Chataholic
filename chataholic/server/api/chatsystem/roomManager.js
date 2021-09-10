const Chatroom = require('./chatroom');
const chatrooms = new Map(); //<roomId, Chatroom>

class RoomManager{

    getRoomById(roomId) {
        return chatrooms.get(roomId)
    }

    addRoom(roomId){
        if(!chatrooms.has(roomId)){
            chatrooms.set(roomId, new Chatroom(roomId));
            console.log("add room"+ roomId);
        }
    }

    removeRoom(roomId){
        console.log("remove room "+roomId+ " ?");
        var size = chatrooms.get(roomId).getMemberSize();
        console.log(size)
        if(size < 1){
            chatrooms.delete(roomId);
            console.log("delete room:"+roomId);
        }
        else console.log("false");
    }


}

module.exports = RoomManager;
