const socket = io();

socket.on('message', (message) => console.log(message));
document.querySelector('#messageform').addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('sendMessage', document.getElementById('message').value);
})
