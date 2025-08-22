const createRoomBtn = document.querySelector(".create-room-btn-js");
const joinRoomBtn = document.querySelector(".join-room-btn-js");

// creating room
createRoomBtn.addEventListener('click', () => {
    window.location.href = '/room/create-room';
});
