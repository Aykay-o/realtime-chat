import express from 'express';
import http from 'http';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path'; 
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); // will handle normal webpage + api routes
const server = http.createServer(app); // we create the server explicitely
const io = new Server(server); // will handle websocket stuff
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log("user has entered the server:", socket.id);

    // messages
    socket.on('chat message', (msg) => {
        console.log(`message from ${socket.id}: ${msg}`);
        io.emit('recieve message', msg);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});