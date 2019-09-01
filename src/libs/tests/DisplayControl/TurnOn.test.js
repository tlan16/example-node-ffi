const ffi = require("ffi");

it(
    'testTurnOn',
    function () {
        const mockedMouseEvent = jest.fn();
        const mockedUser32 = {
            mouse_event: mockedMouseEvent,
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
        DisplayControl.turnOn();

        expect(mockedLibrary).toHaveBeenCalledTimes(1);
        expect(mockedLibrary.mock.calls[0].length).toBe(2);
        expect(mockedLibrary.mock.calls[0][0]).toBe('user32');
        expect(mockedLibrary.mock.calls[0][1]).toStrictEqual({
            mouse_event: ['void', ['int', 'int', 'int', 'int', 'int']],
        });

        expect(mockedMouseEvent).toHaveBeenCalledTimes(1);
        expect(mockedMouseEvent.mock.calls[0].length).toBe(5);
        expect(mockedMouseEvent.mock.calls[0][0]).toBe(4);
        expect(mockedMouseEvent.mock.calls[0][1]).toBe(0);
        expect(mockedMouseEvent.mock.calls[0][2]).toBe(0);
        expect(mockedMouseEvent.mock.calls[0][3]).toBe(0);
        expect(mockedMouseEvent.mock.calls[0][4]).toBe(0);
    }
);


