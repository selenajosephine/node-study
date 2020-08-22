const socket = io();

// server emits -> client receives -> acknowledgment to server
// client emits -> server receives -> acknowledgment to client

// elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');

socket.on('message', (message) => console.log(message));
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // disable  button
    $messageFormButton.setAttribute('disabled', 'disabled');
    socket.emit('sendMessage', $messageFormInput, (error) => {
        // enable button and reset field
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if (error) {
            return console.log(error);
        }
        console.log('Message Delivered');
    });
})

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported on your browser');
    }
    $locationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        const { coords: { latitude, longitude } } = position;
        socket.emit('sendLocation', { latitude, longitude }, () => {
            $locationButton.removeAttribute('disabled');
            console.log('Location shared!');
        });
    });
})