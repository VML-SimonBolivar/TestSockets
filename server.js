const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (for the HTML page)
app.use(express.static(__dirname + '/public'));

const socketIdAdmin = "asdASdSaDasd"
// Socket.io connection
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        // Broadcast the message to all clients
        io.emit('message', msg);
    });

    socket.on('mouse', (msg) => {
        const data = { ...msg, socketId: socket.id };  // Attach the socket ID to the message
        io.emit('mouse', data);  // Broadcast the message to all clients
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
server.listen(9010, () => {
    console.log('Server is running on http://localhost:3000');
});
