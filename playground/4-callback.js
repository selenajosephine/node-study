setTimeout(() => {
    console.log('inside set time out');
}, 2000);

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(data);
    }, 2000)
}

geocode('philadelphia', (data) => {
    console.log(data)
});

const add = (one, two, callback) => {
    setTimeout(() => {
        callback((one + two));
    }, 2000);
}
add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
});

