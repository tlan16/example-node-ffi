const ffi = require('ffi');

const GetSystemMetrics = function () {
    const returnType = 'int';
    const argumentsType = ['int'];
    const SM_CMONITORS = 80;

    const user32 = ffi.Library(
        'user32',
        {
            GetSystemMetrics: [returnType, argumentsType],
        },
    );

    return user32.GetSystemMetrics(SM_CMONITORS);
};

module.exports = {
    GetSystemMetrics,
};
