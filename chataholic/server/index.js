const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require("http");
const cors = require('cors');
const socketIo = require("socket.io");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/api/login', require('./api/login'));
app.use('/api/profile', require('./api/profile'));
app.use('/api/pairing', require('./api/pairing'));
// app.use('/api/friendBox', require('./api/friendBox'));
app.use('/api/friendList', require('./api/friendList'));

app.use(cors());

require('./api/test')(app);

const server = http.createServer(app);
const io = socketIo(server);

const eventHandler = require("./api/chatsystem/handlers");


io.on('connection', function(user){

    const{
        initial,
        handleDisconnect,
        setChatrooms,
        getHistoryHandler,
        handleMessage,
        handlerClear,
        handleDeleteRoom
    } = eventHandler(user);

    user.on('disconnecting', handleDisconnect);
    user.on('leave', handleDeleteRoom)
    user.on("initial_data", initial);
    user.on("message", handleMessage);
    user.on("setrooms", setChatrooms);
    user.on("getHistory", getHistoryHandler);
    user.on("clear", handlerClear);
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
