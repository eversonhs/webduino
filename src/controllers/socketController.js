const connection = require('../connection');

async function createDevice(data, fn) {
    // console.log("Form data received, creating device...");
    // console.log(data);
    const {name, type, pin} = data;
    const value = 0;
    const valueChanged = 'true';

    try {
        await connection('arduinoDevices').
        insert({
            name,
            type,
            pin,
            value,
            valueChanged
        });
        fn(201);
        
    } catch(err) {
        // console.log("Device not created");
        fn(403);
    }
};

module.exports = {
    connection(socket) {
        // console.log("An user has connected to the server.");
        socket.on('createDevice', createDevice);
    }
};