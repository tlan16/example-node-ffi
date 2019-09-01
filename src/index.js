const {GetSystemMetrics} = require('./libs/GetSystemMetrics');
const DisplayControl = require('./libs/DisplayControl');
const {GetLastInputInfoInMs} = require('./libs/GetLastInputInfoInMs');

const log = message => {
    const now = (new Date()).toISOString();
    const messageWithTimestamp = `[${now}]${message}`;
    console.log(messageWithTimestamp);
};

log(`The number of monitors is ${GetSystemMetrics()}.`);

DisplayControl.turnOff();
log('Display is turned off.');

log('Display will be back on after 1 second.');
setTimeout(function () {
    DisplayControl.turnOn();
    log('Display is turned on.');
}, 1000);

setTimeout(function () {
    log(`It has been ${GetLastInputInfoInMs()} ms since last input.`);
}, 2000);
