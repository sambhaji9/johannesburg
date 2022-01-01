module.exports = {
    getUnixTimeStamp() {
        var date = new Date().getTime()/1000;
        return parseInt(date.toFixed(0));
    }
};