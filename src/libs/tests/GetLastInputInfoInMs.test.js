const ffi = require("ffi");
const ref = require('ref');
const refStruct = require('ref-struct');
const GetTickCount = require('../GetTickCount');

it(
    'testGetLastInputInfo',
    function () {
        const mockedGetLastInputInfo = jest.fn();
        const mockedUser32 = {
            GetLastInputInfo: mockedGetLastInputInfo,
        };
        const mockedLibrary = jest.fn(function () {
            return mockedUser32;
        });

        jest.mock('ffi', function () {
            return {
                Library: mockedLibrary,
            };
        });

        const mockedGetTickCount = jest.fn();
        jest.mock('../GetTickCount', function () {
            return {
                GetTickCount: mockedGetTickCount,
            };
        });

        const GetLastInputInfoInMs = require('../GetLastInputInfoInMs');
        GetLastInputInfoInMs.GetLastInputInfoInMs();

        const LASTINPUTINFO = refStruct({
            cbSize: ref.types.int32,
            dwTime: ref.types.uint32,
        });
        expect(mockedLibrary).toHaveBeenCalledTimes(1);
        expect(mockedLibrary.mock.calls[0].length).toBe(2);
        expect(mockedLibrary.mock.calls[0][0]).toBe('user32');
        expect(mockedLibrary.mock.calls[0][1]).toStrictEqual({
            GetLastInputInfo: ['bool', [ref.refType(LASTINPUTINFO)]],
        });

        expect(mockedGetTickCount).toHaveBeenCalledTimes(1);
        expect(mockedGetTickCount.mock.calls[0].length).toBe(0);
    }
);
