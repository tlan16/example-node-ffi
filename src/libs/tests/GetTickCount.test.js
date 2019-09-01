const ffi = require("ffi");
const ref = require('ref');

it(
    'testGetTickCount',
    function () {
        const mockedGetTickCount = jest.fn();
        const mockedUser32 = {
            GetTickCount: mockedGetTickCount,
        };
        const mockedLibrary = jest.fn(function () {
            return mockedUser32;
        });

        jest.mock('ffi', function () {
            return {
                Library: mockedLibrary,
            };
        });

        const GetTickCount = require('../GetTickCount');
        GetTickCount.GetTickCount();

        expect(mockedLibrary).toHaveBeenCalledTimes(1);
        expect(mockedLibrary.mock.calls[0].length).toBe(2);
        expect(mockedLibrary.mock.calls[0][0]).toBe('kernel32');
        expect(mockedLibrary.mock.calls[0][1]).toStrictEqual({
            GetTickCount: ['int32', [ref.types.void]],
        });

        expect(mockedGetTickCount).toHaveBeenCalledTimes(1);
        expect(mockedGetTickCount.mock.calls[0].length).toBe(1);
        expect(mockedGetTickCount.mock.calls[0][0]).toBe(ref.void);
    }
);
