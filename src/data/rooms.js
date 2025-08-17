const rooms = {}; // will hold {roomid : [{socketid: user}] }

export function getAllRooms() {
    return rooms;
}

export function newRoom(roomID, socketID, username) {
    rooms[roomID][socketID] = {username}; // will hold objects of socketid: {username: "name"}
}

export function destroy(roomID) {
    delete rooms[roomID];
}

