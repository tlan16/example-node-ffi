const ffi = require("ffi");

it(
    'testTurnOff',
    function () {
        const mockedSendMessageW = jest.fn();
        const mockedUser32 = {
            SendMessageW: mockedSendMessageW,
        };
        const mockedLibrary = jest.fn(function () {
            return mockedUser32;
        });

        jest.mock('ffi', function () {
            return {
                Library: mockedLibrary,
            };
        });

        const DisplayControl = require('../../DisplayControl');
        DisplayControl.turnOff();

        expect(mockedLibrary).toHaveBeenCalledTimes(1);
        expect(mockedLibrary.mock.calls[0].length).toBe(2);
        expect(mockedLibrary.mock.calls[0][0]).toBe('user32');
        expect(mockedLibrary.mock.calls[0][1]).toStrictEqual({
            SendMessageW: ['int', ["ulong", "uint", "long", "long"]],
        });

        expect(mockedSendMessageW).toHaveBeenCalledTimes(1);
        expect(mockedSendMessageW.mock.calls[0].length).toBe(4);
        expect(mockedSendMessageW.mock.calls[0][0]).toBe(0xffff);
        expect(mockedSendMessageW.mock.calls[0][1]).toBe(0x0112);
        expect(mockedSendMessageW.mock.calls[0][2]).toBe(0xf170);
        expect(mockedSendMessageW.mock.calls[0][3]).toBe(0x0002);
    }
);
