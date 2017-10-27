const ffi = require('ffi');

class User32 {
    constructor() {
        this.SM_CMONITORS = 80;

        const user32Methods = ffi.Library('user32.dll', {
            'GetSystemMetrics': ['int', ['int']]
        });

        Object.assign(this, user32Methods);
    }

    countMonitors() {
        return this.GetSystemMetrics(this.SM_CMONITORS);
    }
}

const u32 = new User32();

console.log('The number of monitors is', u32.countMonitors());
