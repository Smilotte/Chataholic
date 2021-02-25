/**
 * The API that used for the chat system (chatroom)
 * @author kkc21
 */
const db = require('../../database');
var rid = "";
const members = new Map(); //<socket.id, socket>
var chatHistory = []; //{MesId, senderId, content}

class Chatroom{

  constructor(roomId){
    rid = roomId;
    console.log("new Room"+ rid);
    // this.setHistoryDB();
  }
  
  //Add the user to the chatroom 
  addUser(user) {
    if(!members.has(user.id)){
      members.set(user.id, user);
      console.log("user "+ user.id + " join room "+ rid);
    }
    console.log("room "+rid+ "member:" );
    console.log(members.keys());
  }

  setHistoryDB(){
    console.log("roomId:" + rid);
    db.query('SELECT MesId, senderId, content FROM c10_friends.Message WHERE RoomId = ?',[rid], (err,res) => {
      if (err) return err;
      else {console.log(res);chatHistory = res;}
      console.log("room "+rid+ " setHistoryDB ended")  
    })
  }

  initial(user){
    this.setHistoryDB();
    this.addUser(user);

  }
    
  //Broadcast message to all members in this chatroom
  broadcastMessage(content) {
    members.forEach(m => m.emit('message', {rid ,content}));
    this.addMessage(content);
  }
  
  //Add a new message to the chat history
  addMessage(mes) {
    chatHistory = chatHistory.concat(mes)
  }
  
  //Send the chathistory to user
  getChatHistory(user) {
    console.log("user "+user.id+ " getChatHistory: "+rid);
    console.log(chatHistory);
    user.emit('getHistory', chatHistory);
  }

  //Clear the chat history
  clearChatHistory(){
    chatHistory = []
  }

  deleteUser(user){
    console.log("remove user" + user.id);
    members.delete(user.id);
  }

  getMemberSize(){
    return members.size();
  }

  getroomId(){
    console.log(rid);
  }

}

  module.exports = Chatroom;