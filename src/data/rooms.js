const rooms = {}; // { roomID: {users: {socketId: username}} }

export function getAllRooms() {
    return rooms;
}

export function newRoom(roomID) {
    rooms[roomID] = { users: {} };
}


// socket functions
export function joinRoom(roomID, socketID, username) {
    if (rooms[roomID]) {
        rooms[roomID].users[socketID] = username;
    }
}

export function leaveRoom(roomID, socketID) {
    if (rooms[roomID]) {
        delete rooms[roomID].users[socketID];
    }

    // handle empty rooms
    if (Object.keys(rooms[roomID].users).length === 0) {
        delete rooms[roomID];
    }
}

