const ffi = require("ffi");

it(
    'testGetSystemMetrics',
    function () {
        const mockedGetSystemMetrics = jest.fn();
        const mockedUser32 = {
            GetSystemMetrics: mockedGetSystemMetrics,
        };
        const mockedLibrary = jest.fn(function () {
            return mockedUser32;
        });

        jest.mock('ffi', function () {
            return {
                Library: mockedLibrary,
            };
        });

        const GetLastInputInfoInMs = require('../GetSystemMetrics');
        GetLastInputInfoInMs.GetSystemMetrics();

        expect(mockedLibrary).toHaveBeenCalledTimes(1);
        expect(mockedLibrary.mock.calls[0].length).toBe(2);
        expect(mockedLibrary.mock.calls[0][0]).toBe('user32');
        expect(mockedLibrary.mock.calls[0][1]).toStrictEqual({
            GetSystemMetrics: ['int', ['int']],
        });

        expect(mockedGetSystemMetrics).toHaveBeenCalledTimes(1);
        expect(mockedGetSystemMetrics.mock.calls[0].length).toBe(1);
        expect(mockedGetSystemMetrics.mock.calls[0][0]).toBe(80);
    }
);
