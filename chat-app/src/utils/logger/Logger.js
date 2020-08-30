const environment = process.env.ENVIRONMENT || 'development';

const LOGGER = function () { };

LOGGER.prototype.INFO = (logText) =>
    (environment !== 'production') && console.log(`${new Date().toLocaleString()} INFO : ${logText}`);

LOGGER.prototype.DEBUG = (logText) =>
    (environment !== 'production') && console.log(`${new Date().toLocaleString()} DEBUG : ${logText}`);

LOGGER.prototype.ERROR = (logText) =>
    (environment !== 'production') && console.log(`${new Date().toLocaleString()} ERROR : ${logText}`);

module.exports = new LOGGER();
