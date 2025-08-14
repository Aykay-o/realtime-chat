const users = {}

export function getUsername(socketID) {
    return users[socketID];
}

export function registerUser(socketID, username) {
    users[socketID] = username;
}

export function deleteUser(socketID) {
    delete users[socketID];
}