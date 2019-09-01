const ffi = require("ffi");

function turnOff() {
    const returnType = 'int';
    const argumentsType = ["ulong", "uint", "long", "long"];
    const HWND_BROADCAST = 0xffff;
    const WM_SYSCOMMAND = 0x0112;
    const SC_MONITORPOWER = 0xf170;
    const POWER_OFF = 0x0002;

    const user32 = ffi.Library(
        'user32',
        {
            SendMessageW: [returnType, argumentsType],
        },
    );

    user32.SendMessageW(HWND_BROADCAST, WM_SYSCOMMAND, SC_MONITORPOWER, POWER_OFF);
}

function turnOn() {
    const returnType = 'void';
    const argumentsType = ['int', 'int', 'int', 'int', 'int'];

    const user32 = ffi.Library(
        'user32',
        {
            mouse_event: [returnType, argumentsType],
        },
    );

    user32.mouse_event(4, 0, 0, 0, 0);
}

module.exports = {
    turnOn,
    turnOff,
};
