const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([7, 6, 5]);
        reject('err');
    }, 3000)
});

doWorkPromise.then((res) => {
    console.log('success', res);

}).catch((err) => {
    console.log(err,'error')
})