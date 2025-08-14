const socket = io();

const chatform = document.querySelector('.chat-form-js');
const chatInput = document.querySelector('.chat-input-js');

const username = prompt("Please enter a username:");
socket.emit('register user', username);

chatform.addEventListener('submit', sendMessage);

function sendMessage (e) {
    e.preventDefault();

    const msg = chatInput.value;
    if (msg) {
        socket.emit('chat message', (msg));
    } else {
        window.alert("Message must have content");
    }    
}

socket.on ('recieve message', (user, msg) => {
    console.log(`${user}: ${msg}`);
});