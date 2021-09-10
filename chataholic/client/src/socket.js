const io = require('socket.io-client')

export default function () {
    const socket = io.connect('http://localhost:5000')

    socket.on('error', function (err) {
        console.log('received socket error:')
        console.log(err)
    })

    //Initial the chatrooms, chathistory and user in the server
    function initial(userId){
        console.log("initial");
        socket.emit('initial_data', userId);
    }

    //Request the chat history (used in Chatroom)
    function getHistory(roomId){
        console.log("getHistory");
        socket.emit('getHistory',roomId);
    }

    //Listen on the getHistory event (used in Chatroom)
    function setHistory(getData){
        console.log("setHistory");
        socket.on('getHistory',getData)
    }

    //Remove the getHistory event listener
    function unSetHistory(){
        console.log("unsetHistory");
        socket.off('getHistory')
    }

    //Listen on the message event
    function onReceive(updateHistory){
        socket.on('message', updateHistory);
    }

    //Remove the message event listener
    function unReceive(){
        socket.off('message')
    }

    //Emit a leave event
    function leave(roomId) {
        socket.emit('leave', roomId)
    }

    //Emit a message event (used in Chatroom)
    function message(data) {
        socket.emit('message', data)
    }

    //Emit a setrooms event (used in Pairing to add friend)
    function setChatrooms(roomId) {
        console.log("setChatrooms");
        socket.emit('setrooms', roomId)
    }

    function clearChat(roomId){
        socket.emit('clear',roomId);
    }

    function disconnect(){
        socket.disconnect();
    }


    return {
        leave,
        message,
        setChatrooms,
        initial,
        disconnect,
        onReceive,
        getHistory,
        setHistory,
        unSetHistory,
        unReceive,
        clearChat
    }
}
