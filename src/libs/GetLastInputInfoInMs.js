const ffi = require('ffi');
const ref = require('ref');
const refStruct = require('ref-struct');
const {GetTickCount} = require('./GetTickCount');

/**
 * @return {number} ms from last input
 */
const GetLastInputInfo = function () {
    const LASTINPUTINFO = refStruct({
        cbSize: ref.types.int32,
        dwTime: ref.types.uint32,
    });
    const PLASTINPUTINFO = ref.refType(LASTINPUTINFO);

    const returnType = 'bool';
    const argumentsType = [PLASTINPUTINFO];

    const user32 = ffi.Library(
        'user32',
        {
            GetLastInputInfo: [returnType, argumentsType],
        },
    );

    let result = new LASTINPUTINFO();
    result.cbSize = LASTINPUTINFO.size;

    let failed = (user32.GetLastInputInfo(result.ref()) === 0);

    if (failed) {
        throw new Error("Couldn't get idle time");
    }

    return GetTickCount() - result.dwTime;
};

module.exports = {
    GetLastInputInfoInMs: GetLastInputInfo,
};
