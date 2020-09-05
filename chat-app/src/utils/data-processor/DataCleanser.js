const trimAndCleanseData = (data) => data && data.trim().toLowerCase();

const checkValidity = (data) => data.some(datum => !(datum === undefined || datum === null || datum === ''));

module.exports = {
    trimAndCleanseData, checkValidity
}