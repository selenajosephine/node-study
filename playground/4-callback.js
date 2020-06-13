const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error', undefined);
        callback(undefined, 'Success');
    }, 3000);
}

doWorkCallback((err, result) => {
    if (err) {
        return console.log(err);
    }
    console.log(result);
})