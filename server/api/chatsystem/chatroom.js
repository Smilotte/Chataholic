/*
* The API that used for the chat system (chatroom)
* @author kkc21
*/
var db = require('../../database');
const MessageModel = require('../../models/message');

const chatroom = function (roomId) {
    let rid = roomId;
    const members = new Map();
    let chatHistory = []; //{senderId, content}

    //Add the user to the chatroom
    function addUser(user) {
        if(!members.has(user.id)){
            members.set(user.id, user);
            console.log("user "+ user.id + " join room "+ rid);
        }
        console.log("room "+rid+ "member:" + members.keys());
    }

    async function setHistoryDB(){
        if(chatHistory.length === 0){
            history = await MessageModel.getHistoryByRoomId(rid);
            console.log(history);
            chatHistory = history;
        }
    }

    //Broadcast message to all members in this chatroom
    function broadcastMessage(senderId, content) {
        members.forEach(m => m.emit('message', {senderId,content}));
        this.addMessage(rid,senderId, content);
    }

    //Add a new message to the chat history
    function addMessage(rid,senderId, content) {
        chatHistory = chatHistory.concat({senderId, content});
        MessageModel.newMessage(content,senderId,rid);
    }

//   async function getChatHistory(user) {
//     console.log("user " + user.id + " getChatHistory: " + rid);
//     chatHistory = await MessageModel.getHistoryByRoomId({rid})
//     chatHistory = chatHistory.map(h => ({MesId: h.MesId, senderId: h.SenderId, content: h.Content}))
//     user.emit('getHistory', chatHistory);
// }

    //Emit the chatHistory to the user who required
    function getChatHistory(user) {
        console.log("user "+user.id+ " getChatHistory: "+rid);
        user.emit('getHistory', chatHistory);
    }

    //Clear the chat history
    function clearChatHistory(){
        chatHistory = []
    }

    function getMemberSize(){
        return members.size;
    }

    function  deleteUser(user){
        members.delete(user.id);
        console.log("remove user:" + user.id + " size: "+members.size);
    }

    return {
        broadcastMessage,
        addMessage,
        getChatHistory,
        addUser,
        clearChatHistory,
        setHistoryDB,
        deleteUser,
        getMemberSize
    }
}
module.exports = chatroom;
