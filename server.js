const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); 
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname)));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('send_message', (msg) => {
        console.log('Message:', msg);
        io.emit('receive_message', msg); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
