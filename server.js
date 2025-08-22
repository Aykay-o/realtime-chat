import express from 'express';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path'; 
import { Server } from 'socket.io';

// routes
import roomRouter from './src/routes/roomRoutes.js'

// user data
import { getUsername, registerUser, deleteUser } from './src/data/users.js'
//room data
import { joinRoom, leaveRoom } from './src/data/rooms.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // will handle normal webpage + api routes
const server = http.createServer(app); // we create the server explicitely
const io = new Server(server); // will handle websocket stuff
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/room', roomRouter);

app.get('/', (req, res) => {
    res.send(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log("user has entered the server:", socket.id);

    // register user
    socket.on('register user', (username) => {
        registerUser(socket.id, username);
        // joinRoom(); //TODO
    });

    // user disconnect
    socket.on('disconnect', () => {
        deleteUser(socket.id);
        // leaveRoom(); //TODO
    });

    // messages
    socket.on('chat message', (msg) => {
        console.log(`${getUsername(socket.id)}: ${msg}`);
        io.emit('recieve message', getUsername(socket.id), msg);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});