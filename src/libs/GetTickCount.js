const ffi = require('ffi');
const ref = require('ref');

const GetTickCount = function () {
    const returnType = 'int32';
    const argumentsType = [ref.types.void];

    const kernel32 = ffi.Library(
        'kernel32',
        {
            'GetTickCount': [returnType, argumentsType],
        },
    );

    return kernel32.GetTickCount(ref.void);
};

module.exports = {
    GetTickCount,
};
