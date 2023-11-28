const express = require('express')
const app = express();

const http = require('http');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

/// socket.io

const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log("connected")

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})