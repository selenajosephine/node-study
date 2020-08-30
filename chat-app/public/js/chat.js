const socket = io();

// server emits -> client receives -> acknowledgment to server
// client emits -> server receives -> acknowledgment to client

// elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });
socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (url) => {
    const locationHtml = Mustache.render(locationTemplate, { url: url.url, createdAt: moment(url.createdAt).format('h:mm a') });
    $messages.insertAdjacentHTML('beforeend', locationHtml);
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // disable  button
    $messageFormButton.setAttribute('disabled', 'disabled');
    socket.emit('sendMessage', document.getElementById('message').value, (error) => {
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
        });
    });
})

socket.emit("join", { username, room })